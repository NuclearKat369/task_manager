import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../features/store";
import { selectCurrentRoles, selectCurrentToken, selectCurrentEmail } from "../features/auth/authSlice";


const RequireAuth = ({ allowedRoles }) => {
    const token = useAppSelector(selectCurrentToken);
    const user = useAppSelector(selectCurrentEmail)
    const location = useLocation();
    const roles = useAppSelector(selectCurrentRoles);
    console.log("selectCurrentRoles: ", roles);

    console.log("RequireAuth TOKEN: ", token);

    return (
        token && user
            ? roles.find(role => allowedRoles?.includes(role.roleId))
                ? <Outlet />
                : <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;