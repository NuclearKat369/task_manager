import { logOut, selectCurrentToken, selectCurrentEmail, setCredentials } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../features/store";
import axios from "../services/axios";

const useRefreshToken = () => {

    const access = useAppSelector(selectCurrentToken);
    const email = useAppSelector(selectCurrentEmail);
    const dispatch = useAppDispatch();

    console.log("EMAIL IN useRefreshToken", email);


    const refresh = async () => {
        const response = await axios.get("/auth/refresh-token", {
            withCredentials: true
        })
        if (response?.data) {
            // Сохранение обновлённых данных
            dispatch(setCredentials({
                email: response.data.email,
                accessToken: response.data.accessToken,
                lastName: response.data.lastName,
                firstName: response.data.firstName,
                patronymic: response.data.patronymic,
                uuid: response.data.employeeId,
                roles: response.data.roles,
            }));
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