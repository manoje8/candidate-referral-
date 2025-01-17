import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { resetPassword } from "../../redux/actions/userAction"
import Wrapper from "../UI/Wrapper"

const ResetPassword = () => {
    const {isLoading, error} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        otp: "",
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handleChange = ({target: {name, value}}) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(values.newPassword !== values.confirmPassword)
        {
            console.log("Password doesn't match");
            return;
        }
        
        
        const resultAction = await dispatch(resetPassword(values))

        if (resetPassword.fulfilled.match(resultAction)) 
        {
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
            <h3 className="text-center mt-1">Account</h3>
            <form onSubmit={handleSubmit} className="px-3 mb-3">
                <div className="form-group">
                    <label>OTP</label>
                    <input name="otp" className="form-control" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="email" className="form-control" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input name="newPassword" type="password" className="form-control" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input name="confirmPassword" type="password" className="form-control" onChange={handleChange} required/>
                </div>
               <div className="d-flex justify-content-between mt-3">
                <button type="submit" className="btn btn-primary btn-sm" >Reset Password</button>
                <a type="submit" href="/login" className="btn btn-dark btn-sm" >cancel</a>
               </div>
            </form>
        </Wrapper>
    )
}

export default ResetPassword