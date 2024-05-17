import { apiSlice } from "./apiSlice";
import { TASK_API_BASE_URL } from "./globalConst";


export const taskListApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Обращение к API для получения из БД всех заявок со статусом и подтипом
        showWithStatusesAndSubtypes: builder.query<any, void>({
            query: () => TASK_API_BASE_URL,
        }),
        // Обращение к API для получения из БД общего количества заявок
        countAllTasks: builder.query<any, void>({
            query: () => TASK_API_BASE_URL + "/getNumberOfAllTasks",
        }),
        getAllTasksWithStatusId: builder.query<any, { statusId: string }>({
            query: (arg) => {
                const { statusId } = arg;
                return {
                    url: TASK_API_BASE_URL + `/getStatus/${statusId}`,
                }
            }
        }),
        // Обращение к API для получения из БД заявки с переданным ID
        getTask: builder.query<any, { taskId: string }>({
            query: (arg) => {
                const { taskId } = arg;
                return {
                    url: TASK_API_BASE_URL + `/${taskId}`,
                }
            }
        }),
        // Обращение к API для добавления в БД новой заявки
        createTask: builder.mutation({
            query: task => ({
                url: TASK_API_BASE_URL,
                method: "POST",
                body: { ...task }
            })
        }),
        // Обращение к API для обновления в БД заявки с переданным ID
        updateTask: builder.mutation({
            query: ({ task, taskId }) => ({
                url: TASK_API_BASE_URL + `/${taskId}`,
                method: "PUT",
                body: { ...task }
            })
        }),
        // Обращение к API для удаления из БД заявки с переданным ID
        deleteTask: builder.mutation({
            query: (taskId: any) => ({
                url: TASK_API_BASE_URL + `/${taskId}`,
                method: 'DELETE',
            }),
        }),
        getTaskEmployeeInCharge: builder.query<any, { taskId: string }>({
            query: (arg) => {
                const { taskId } = arg;
                return {
                    url: TASK_API_BASE_URL + `/${taskId}/employee-in-charge`,
                }
            }
        }),
        countTasksWhereCreator: builder.query<any, { employeeId: string }>({
            query: (arg) => {
                const { employeeId } = arg;
                return {
                    url: TASK_API_BASE_URL + `/creator-count/${employeeId}`,
                }
            }
        }),
        countTasksWhereInCharge: builder.query<any, { employeeId: string }>({
            query: (arg) => {
                const { employeeId } = arg;
                return {
                    url: TASK_API_BASE_URL + `/in-charge-count/${employeeId}`,
                }
            }
        }),
        })
})

export const {
    useShowWithStatusesAndSubtypesQuery,
    useCountAllTasksQuery,
    useGetAllTasksWithStatusIdQuery,
    useGetTaskQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useGetTaskEmployeeInChargeQuery,
    useCountTasksWhereCreatorQuery,
    useCountTasksWhereInChargeQuery,
} = taskListApiSlice;