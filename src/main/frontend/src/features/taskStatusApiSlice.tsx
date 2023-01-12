import { apiSlice } from "../services/apiSlice";

const STATUS_API_BASE_URL = "/showStatus";

export const taskStatusApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStatuses: builder.query<any, void>({
            query: () => STATUS_API_BASE_URL + "/getStatus/all",
            keepUnusedDataFor: 5,
        }),
        countTasksByStatus: builder.query<any, void>({
            query: () => STATUS_API_BASE_URL + "/getNumberByStatus",
            keepUnusedDataFor: 5,
        }),
        getStatus: builder.query<any, { statusId: string }>({
            query: (arg) => {
                const { statusId } = arg;
                return {
                    url: STATUS_API_BASE_URL + "/getStatus/" + statusId,
                }
            }
        })
    })
})

export const {
    useGetStatusesQuery,
    useCountTasksByStatusQuery, 
    useGetStatusQuery
} = taskStatusApiSlice;