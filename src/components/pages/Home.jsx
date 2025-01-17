import { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCandidateList, getCandidateList } from "../../redux/actions/candidateAction"
import Navbar from "../UI/Navbar"
import Card from "../UI/Card"
import MetricsDashboard from "../dashboard/MetricsDashboard"
import withAuth from "../withAuth"
import Loader from "../UI/Loader"

const Home = () => {
    const {candidates, isLoading, error} = useSelector(state => state.candidate)
    const dispatch = useDispatch()
    const [filteredValue, setFilteredValue] = useState([])
    const [searchOption, setSearchOption] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [filterOption, setFilterOption] = useState("")
    const role = localStorage.getItem("role")

    const fetchList = useCallback(async() => {
        try 
        {
            if(role == "manager")
            {
                await dispatch(getAllCandidateList())
            }else
            {
                await dispatch(getCandidateList())
            }
        } 
        catch (error) 
        {
            console.log(error);
        }
    },[dispatch, role])

    useEffect(() => {
        fetchList()
    },[fetchList])

    useEffect(() => {
        if (filterOption && filterOption.length > 0) {
            setFilteredValue(candidates.filter(candidate => candidate.status === filterOption));
        } else {
            setFilteredValue(candidates);
        }
    }, [candidates, filterOption]);


    const searchCandidate = useMemo(() => {
            return filteredValue.filter(candidate => {
                if (searchOption == "jobTitle") 
                {
                    return candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
                }
                else
                {
                    return candidate.name.toLowerCase().includes(searchTerm.toLowerCase());
                }
            })
    },[searchOption, filteredValue, searchTerm])

    if (isLoading) {
        return <div className="text-center mt-5"><Loader /></div>;
    }

    if (error) {
        return <div className="text-center mt-5">Error: {error}</div>;
    }


    return (
        <div className="">
            <Navbar />
            <div className="container border p-3" style={{marginTop: "90px"}}>
                <h3 className="text-center mb-3">Welcome to the Referral management system</h3>
                <section>
                    {
                    role == "manager" ? <MetricsDashboard /> : ""
                    }
               </section>
               <h4 className="mb-3 mt-5">Candidates</h4>

                <div className="d-flex justify-content-between">
                    <form className="d-flex gap-2">
                        <input type="text" className="form-control form-control-sm" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)}/>
                        <select className="form-select form-select-sm" value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
                            <option value="name">Name</option>
                            <option value="jobTitle">Role</option>
                        </select>
                    </form>

                    <div className="d-flex gap-2">
                        <label>Filter</label>
                        <select className="form-select form-select-sm" value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                            <option defaultChecked value="">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Hired">Hired</option>
                        </select>
                    </div>
                </div>

                <hr />

               <section className="d-flex justify-content-evenly m-2 gap-3 flex-wrap">
               {
                    searchCandidate.length == 0 ? "No data":
                    searchCandidate.map(candidate => (
                        <Card key={candidate._id} candidate={candidate}/>
                    ))
                }
               </section>

            </div>
        </div>
    )
}

export default withAuth(Home)