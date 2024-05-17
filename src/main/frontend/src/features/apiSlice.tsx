import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "./auth/authSlice"
import { API_BASE_URL } from "./globalConst";

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }: any) => {
        const token = getState().auth.accessToken;
        console.log("TOKEN IN baseQuery ", token);
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        console.log("prepareHeaders", headers)
        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result: any = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403) {
        console.log("sending refresh token");
        // Отправка refresh-токена для получения нового access токена
        const refreshResult: any = await baseQuery("/auth/refresh-token", api, extraOptions);
        console.log("refreshResult: ", refreshResult);
        if (refreshResult?.data) {
            // Сохранение нового токена
            api.dispatch(setCredentials({
                email: refreshResult.data.email,
                accessToken: refreshResult.data.accessToken,
                lastName: refreshResult.data.lastName,
                firstName: refreshResult.data.firstName,
                patronymic: refreshResult.data.patronymic,
                uuid: refreshResult.data.employeeId,
                roles: refreshResult.data.roles,
            },));
            // Повторная отправка изначального запроса с новым access-токеном
            result = await baseQuery(args, api, extraOptions);
        }
        else {
            api.dispatch(logOut(""));
            console.log("LOGGED OUT")
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})