import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token");

    const logoutHandler = () => {
        const response = confirm("Are you want to Logout?")
        if(response)
        {
            localStorage.clear()
            navigate("/login")
        }
    }

    return (
        <nav className="navbar">
            <div className="container-fluid">
                <a href="/" className="navbar-brand">Candidate Referral Management</a>
                <div className="mx-2">
                        <a href="/add-candidate" className="mx-2">
                            Add referral
                            <i className="bi bi-plus-circle mx-1"></i>
                        </a>
                        
                    
                    {
                    token ? 
                        <span onClick={logoutHandler} >
                            Logout
                            <i className="bi bi-box-arrow-right mx-1"></i>
                        </span>
                        : 
                        <a href="/login">
                            Login
                            <i className="bi bi-box-arrow-in-right mx-1"></i>
                        </a>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar