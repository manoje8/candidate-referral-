import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../redux/actions/userAction"
import Wrapper from "../UI/Wrapper"
import ButtonSpinner from "../UI/ButtonSpinner"


const Register = () => {
    const {isLoading, error} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        name:"",
        email: "",
        password: ""
    })

    const handleChange = ({target: {name, value}}) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const resultAction = await dispatch(register(values))

        if (register.fulfilled.match(resultAction)) {
            // If registration is successful, navigate to the login page
            navigate('/login');
        }
}

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Wrapper>
            <h4 className="text-center mt-1">Account</h4>
            <form onSubmit={handleSubmit} className="px-3 pb-3">
                <div className="form-group">
                    <label>Name</label>
                    <input name="name" className="form-control form-control-sm" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="email" className="form-control form-control-sm" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control form-control-sm" onChange={handleChange} required/>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    {!isLoading ? 
                    <button type="submit" className="btn btn-primary btn-sm" >Create an account</button> 
                    :
                    <ButtonSpinner buttonName={"Create an account"}/>
                    }
                    <a className="btn btn-sm btn-dark" href="/login">Back to Login</a>
                </div>
            </form>
        </Wrapper>
)}

export default Register