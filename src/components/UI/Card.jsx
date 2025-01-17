import { useDispatch } from "react-redux";
import { deleteCandidate, updateCandidate } from "../../redux/actions/candidateAction";


const Card = ({candidate}) => {
    const dispatch = useDispatch();
    const {_id, name, email, status, phone, jobTitle, createdAt, resume} = candidate;

    const role = localStorage.getItem("role")

    const handleChange = async(e) => {
        console.log(e.target.value);
        
        const updateStatus = {_id, name, email, status: e.target.value, phone, jobTitle, createdAt, resume}
        await dispatch(updateCandidate(updateStatus))
    }

    const handleDelete = async(id) => {
        const response = confirm("Do you want to delete?")
        if(response)
        {
            await dispatch(deleteCandidate(id))
        }
    }
    
    return (
        <div className="card" style={{width: "18rem"}}>
            <a href={resume} target="_blank" className="btn btn-secondary py-3 m-2" style={{backgroundColor: "light-grey"}}>Resume</a>
            
            <div className="card-body">
                <h5 className="text-center">{name}</h5>
                <p><kbd>Email</kbd> {email}</p>
                {
                    role === "manager"? 
                    <div className="d-flex gap-2">
                        <kbd>Status</kbd>
                        <select className="form-select form-select-sm" value={status} onChange={handleChange}>
                            <option value="Pending" selected>Pending</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Hired">Hired</option>
                        </select>
                    </div>
                    :
                    <p><kbd>Status</kbd> {status}</p>
                }
                <p><kbd>Phone</kbd> {phone}</p>
                <p><kbd>Job Title</kbd> {jobTitle}</p>

                <div className="d-flex justify-content-between">
                <p><kbd>Date</kbd>{new Date(createdAt).toLocaleDateString()}</p>
                    <button className="btn btn-sm bg-danger text-light" onClick={() => handleDelete(_id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Card