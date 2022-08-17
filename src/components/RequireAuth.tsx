import { FunctionComponent } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth: FunctionComponent = () => {
    const {token} = useAuth();
    const location = useLocation();
    if (token == null) {
        return <Navigate to="/auth" state={{from: location}} replace/>
    } else {
        return <Outlet/>;
    }
}

export default RequireAuth;