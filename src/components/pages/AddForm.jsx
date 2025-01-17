import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addCandidate } from "../../redux/actions/candidateAction";
import { useNavigate } from "react-router-dom";
import Loader from "../UI/Loader";

const AddForm = () => {
    const {isLoading, error} = useSelector(state => state.candidate)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [errorSupport, setErrorSupport] = useState("");
    const [validationErrors, setValidationErrors] = useState("");

    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        jobTitle: "",
        resumeUrl: null
    })

    const handleChange = ({target: { name, value }}) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== "application/pdf") {
            setValidationErrors("Only PDF files are allowed.");
            return;
        } else if (file && file.size > 5 * 1024 * 1024) {
            setValidationErrors("File size must not exceed 5MB.");
            return
        } else {
            setValues({
                ...values,
                resumeUrl: file
            })
        }
    }


    const handleSubmit = async(e) => {
        e.preventDefault();

        !window.chrome ? setErrorSupport("Browser not supported. please use chrome") :setErrorSupport("")

        if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) {
            setValidationErrors("A valid email is required.");
            return;
        }

        let validatePhone = values.phone.split("").map(Number)
        if (validatePhone.length === 10) {
           setValidationErrors("A valid 10-digit phone number is required.");
           return;
        }
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("jobTitle", values.jobTitle);
        if (values.resumeUrl) formData.append("resume", values.resumeUrl);

        const resultAction = await dispatch(addCandidate(formData))

        if (addCandidate.fulfilled.match(resultAction)) 
        {
            const response = confirm("Successfully Added. Wanna refer another candidate");
            if(!response)
            {
                navigate("/")
            }
        } 
        setValues({
            name: "",
            email: "",
            phone: "",
            jobTitle: "",
            resumeUrl: null
        })
    }

    if (isLoading) {
        return <div className="text-center mt-5"><Loader /></div>;
    }

    if (error) {
        return <div className="text-center mt-5">Error: {error}</div>;
    }


    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <h3 className="text-center py-3">Add Candidate</h3>
            <form style={{width: "500px"}} onSubmit={handleSubmit}>
                <small className="text-danger">{errorSupport.length > 0 ? errorSupport : ""}</small>
                <small className="text-danger">{validationErrors}</small>
                <div className="form-group">
                    <label>Name</label>
                    <input name="name" value={values.name} type="text" className="form-control form-control-sm" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input name="email" value={values.email} type="email" className="form-control form-control-sm" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" value={values.phone} type="text" className="form-control form-control-sm" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Job Title</label>
                    <input name="jobTitle" value={values.jobTitle} type="text" className="form-control form-control-sm" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <div className="mb-3">
                        <label htmlFor="formFileSm" className="form-label">Resume</label>
                        <input name="resumeUrl"  className="form-control form-control-sm" id="formFileSm" type="file" onChange={handleFileChange} required/>
                    </div>
                </div>

                <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-success px-5">{validationErrors ? "": "Add"}</button>
                    <a className="btn btn-sm btn-dark px-2" href="/">Home</a>
                </div>

            </form>
        </div>
    )
}

export default AddForm