import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../features/store";
import { selectCurrentToken, selectCurrentUser } from "../features/auth/authSlice";


const RequireAuth = () => {
    const token = useAppSelector(selectCurrentToken);
    const user = useAppSelector(selectCurrentUser)
    const location = useLocation();

    console.log("RequireAuth TOKEN: ", token)

    return (
        token && user
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;