import { Navigate } from "react-router-dom";

const withAuth = (WrapperComponent) => {
    const AuthHOC = (props) => {
        const token = localStorage.getItem("token");

        if (!token) {
            return <Navigate to="/login" replace />;
        }

        return <WrapperComponent {...props} />;
    };

    AuthHOC.displayName = `withAuth(${WrapperComponent.displayName || WrapperComponent.name || 'Component'})`;

    return AuthHOC;
}

export default withAuth;
