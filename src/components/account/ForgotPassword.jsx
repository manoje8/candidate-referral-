import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/actions/userAction";
import Wrapper from "../UI/Wrapper";
import ButtonSpinner from "../UI/ButtonSpinner";

const ForgotPassword = () => {
    const {isLoading, error} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');

    const handleChange = ({target: {value}}) => {
        setEmail(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const resultAction = await dispatch(forgotPassword(email))

        if (forgotPassword.fulfilled.match(resultAction)) {
            navigate('/login');
        }
    }

    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5">Error: {error}</div>;
    }

    return (
        <Wrapper>
            <h4 className="text-center mt-1">Reset Password</h4>
            <form onSubmit={handleSubmit} className="px-3 my-3">
                <span className="sub-title mb-">Enter your email and we will send details on how to reset your password.</span>
                <div className="form-group">
                    <input type="email" className="form-control form-control-sm mt-3" placeholder="Registered email address" onChange={handleChange} required/>
                </div>
                
                <div className="d-flex justify-content-between mt-3">
                    {!isLoading ? 
                    <button type="submit" id="reset-button" className="btn btn-info btn-sm">Send password reset link</button> 
                    :
                    <ButtonSpinner buttonName={"Send password reset link"}/>
                    }
                    
                    <a className="btn btn-sm btn-secondary" href="/login">Back to Login</a>
                </div>
            </form>
        </Wrapper>
)}

export default ForgotPassword