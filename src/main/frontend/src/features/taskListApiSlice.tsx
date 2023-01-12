import { apiSlice } from "../services/apiSlice";

const TASK_API_BASE_URL = "/tasks";

export const taskListApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        showWithStatusesAndSubtypes: builder.query<any, void>({
            query: () => TASK_API_BASE_URL,
        }),
        countAllTasks: builder.query<any, void>({
            query: () => TASK_API_BASE_URL + "/getNumberOfAllTasks",
        }),
        getAllTasksWithStatusId: builder.query<any, { statusId: string }>({
            query: (arg) => {
                const { statusId } = arg;
                return {
                    url: TASK_API_BASE_URL + "/getStatus/" + statusId,
                }
            }
        }),
        getTask: builder.query<any, { taskId: string }>({
            query: (arg) => {
                const { taskId } = arg;
                return {
                    url: TASK_API_BASE_URL + "/" + taskId,
                }
            }
        }),
        createTask: builder.mutation({
            query: task => ({
                url: TASK_API_BASE_URL,
                method: "POST",
                body: { ...task }
            })
        }),
        updateTask: builder.mutation({
            query: ({ task, taskId }) => ({
                url: TASK_API_BASE_URL + "/" + taskId,
                method: "PUT",
                body: { ...task }
            })
        }),
        deleteTask: builder.mutation({
            query: taskId => ({
                url: TASK_API_BASE_URL + "/" + taskId,
                method: "DELETE",
            })
        }),
    })
})

export const {
    useShowWithStatusesAndSubtypesQuery,
    useCountAllTasksQuery,
    useGetAllTasksWithStatusIdQuery,
    useGetTaskQuery,
    useCreateTaskMutation,
} = taskListApiSlice;