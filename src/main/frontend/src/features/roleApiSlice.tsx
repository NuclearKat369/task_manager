import { apiSlice } from "./apiSlice";
import { ROLE_API_BASE_URL } from "./globalConst";

export const roleApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllRoles: builder.query<any, void>({
            query: () => ROLE_API_BASE_URL,
            keepUnusedDataFor: 60,
        }),

    })
})

export const {
    useGetAllRolesQuery
} = roleApiSlice;