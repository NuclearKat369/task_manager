import { apiSlice } from "../services/apiSlice";
import { POSITION_API_BASE_URL } from "./globalConst";

export const positionApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPositions: builder.query<any, void>({
            query: () => POSITION_API_BASE_URL,
            keepUnusedDataFor: 60,
        }),

    })
})

export const {
    useGetAllPositionsQuery,
} = positionApiSlice;