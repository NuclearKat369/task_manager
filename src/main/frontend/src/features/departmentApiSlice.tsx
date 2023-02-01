import { apiSlice } from "../services/apiSlice";
import { DEPARTMENT_API_BASE_URL } from "./globalConst";

export const departmentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllDepartments: builder.query<any, void>({
            query: () => DEPARTMENT_API_BASE_URL,
            keepUnusedDataFor: 60,
        }),
    })
})

export const {
    useGetAllDepartmentsQuery,
} = departmentApiSlice;