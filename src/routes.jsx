import { Route, Routes } from "react-router-dom"
import App from "./App"
import Error404 from "./components/pages/Error404"
import Home from "./components/pages/Home"
import Register from "./components/account/Register"
import Login from "./components/account/Login"
import ResetPassword from "./components/account/ResetPassword"
import ForgotPassword from "./components/account/ForgotPassword"
import AddForm from "./components/pages/AddForm"

const AppRoutes = () => (
    <App>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="*" element={<Error404 />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/reset-password" element={<ResetPassword />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>
            <Route path="/add-candidate" element={<AddForm />}/>
        </Routes>
    </App>
)

export default AppRoutes