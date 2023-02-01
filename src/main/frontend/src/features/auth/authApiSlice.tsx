import { apiSlice } from "../../services/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "auth/authenticate",
                method: "POST",
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: "auth/register",
                method: "POST",
                body: { ...credentials }
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `auth/logout`,
                method: "DELETE"
            })
        }),
        changePassword: builder.mutation({
            query: ({ currentPassword, newPassword, employeeId }) => ({
                url: `auth/change-password/${employeeId}`,
                method: "PUT",
                body: { currentPassword, newPassword }
            })
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useChangePasswordMutation,
} = authApiSlice;