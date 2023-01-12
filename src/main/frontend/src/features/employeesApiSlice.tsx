import { apiSlice } from "../services/apiSlice";

export const employeesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllEmployees: builder.query<any, void>({
            query: () => "/employees",
            keepUnusedDataFor: 60,
        })
    })
})

export const {
    useGetAllEmployeesQuery
} = employeesApiSlice;