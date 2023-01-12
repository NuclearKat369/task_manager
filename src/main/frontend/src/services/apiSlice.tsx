import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "../features/auth/authSlice"
import { useAppSelector } from "../features/store";

const API_BASE_URL = "http://localhost:8080";

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
        //send the refresh token to get new access token
        const refreshResult: any = await baseQuery("/auth/refresh-token", api, extraOptions);
        console.log("refreshResult: ", refreshResult);
        if (refreshResult?.data) {
            //store the new token
            api.dispatch(setCredentials({ email: refreshResult.data.email, accessToken: refreshResult.data.accessToken },));
            //retry the original query with new access token
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