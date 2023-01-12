import { useDispatch } from "react-redux";
import { logOut, selectCurrentToken, selectCurrentUser, setCredentials } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../features/store";
import axios from "../services/axios";

const useRefreshToken = () => {

    const access = useAppSelector(selectCurrentToken);
    const email = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    console.log("EMAIL IN useRefreshToken", email);
    

    const refresh = async () => {
        const response = await axios.get("/auth/refresh-token", {
            withCredentials: true
        })
        if (response?.data) {
            //store the new token
            dispatch(setCredentials({ email: response.data.email, accessToken: response.data.accessToken }));
            //retry the original query with new access token
        }
        else {
            dispatch(logOut(""));
            console.log("LOGGED OUT")
        }
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;