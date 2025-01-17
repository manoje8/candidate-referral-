import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userAction";
import ButtonSpinner from "../UI/ButtonSpinner";
import Wrapper from "../UI/Wrapper";

const Login = () => {
    const {isLoading, error} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
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

        const resultAction = await dispatch(login(values))

        console.log(resultAction)

        if (login.fulfilled.match(resultAction)) 
        {
            navigate('/');
        }
    }

    return (
        <Wrapper>
            
            <h4 className="text-center mt-1">Sign in</h4>
            
            {error && <small className="text-center text-light p-1 bg-danger rounded">{error}</small>}
            <div className="px-4 mb-3">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input name="email" type="email" className="form-control form-control-sm" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <div className="d-flex justify-content-between py-1">
                            <label>Password</label>
                            <small><a href="/forgot-password">Forgotten your password?</a></small>
                        </div>
                        <input name="password" type="password" className="form-control form-control-sm" onChange={handleChange} required/>
                    </div>
                    {
                        isLoading ? <ButtonSpinner buttonName={"Sign in....."}/> : 
                        <button type="submit" className="btn btn-primary btn-sm mt-3">Sign in</button>
                    }
                    <p className="mt-3">
                        <a className="btn btn-sm btn-dark" href="/register">Create an account</a>
                    </p>
                </form>
            </div>
            
        </Wrapper>
)}

export default Login