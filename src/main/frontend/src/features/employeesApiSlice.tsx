import { apiSlice } from "../services/apiSlice";
import { EMPLOYEE_API_BASE_URL, TASK_API_BASE_URL } from "./globalConst";

export const employeesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Обращение к API для получения всех сотрудников
        getAllEmployees: builder.query<any, void>({
            query: () => EMPLOYEE_API_BASE_URL,
            keepUnusedDataFor: 60,
        }),
        // Обращение к API для получения всех сотрудников с определённой ролью 
        getAllEmployeeWithRole: builder.query<any, { roleId: number }>({
            query: (arg) => {
                const { roleId } = arg;
                return {
                    url: EMPLOYEE_API_BASE_URL + `/${roleId}`,
                }
            }
        }),
        // Обращение к API для получения информации о назначенных на сотрудников заявках
        getAllEmployeesWorkload: builder.query<any, void>({
            query: () => TASK_API_BASE_URL + "/workload",
            keepUnusedDataFor: 60,
        }),
         // Обращение к API для получения информации о сотруднике по ID
        getEmployeeById: builder.query<any, { employeeId: string }>({
            query: (arg) => {
                const { employeeId } = arg;
                return {
                    url: EMPLOYEE_API_BASE_URL + `/get-employee/${employeeId}`,
                }
            }
        }),
        // Обращение к API для обновления в БД заявки с переданным ID
        updateEmployee: builder.mutation({
            query: ({ employee, employeeId }) => ({
                url: EMPLOYEE_API_BASE_URL + `/${employeeId}`,
                method: "PUT",
                body: { ...employee }
            })
        }),
    })
})

export const {
    useGetAllEmployeesQuery,
    useGetAllEmployeeWithRoleQuery,
    useGetAllEmployeesWorkloadQuery,
    useGetEmployeeByIdQuery,
    useUpdateEmployeeMutation,
} = employeesApiSlice;