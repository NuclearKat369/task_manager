import { apiSlice } from "./apiSlice";
import { TASK_HISTORY_API_BASE_URL } from "./globalConst";

export const taskHistoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTaskHistory: builder.query<any, { taskId: string }>({
            query: (arg) => {
                const { taskId } = arg;
                return {
                    url: TASK_HISTORY_API_BASE_URL + `/${taskId}`,
                }
            }
        }),
    })
})

export const {
    useGetTaskHistoryQuery,
} = taskHistoryApiSlice;