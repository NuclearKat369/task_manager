import { apiSlice } from "../services/apiSlice";
import { TaskStatusType } from "./enums";

const SUBTYPE_API_BASE_URL = "/showSubtype";

export const taskListApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSubtypes: builder.query<any, void>({
            query: () => SUBTYPE_API_BASE_URL+"/getSubtype/all",
            keepUnusedDataFor: 60,
        }),
        
        getSubtype: builder.query<any, { subtypeId: string }>({
            query: (arg) => {
                const { subtypeId } = arg;
                return {
                    url: SUBTYPE_API_BASE_URL + "/getSubtype/" + subtypeId,
                }
            }
        }),
    })
})

export const {
    useGetSubtypesQuery,
    useGetSubtypeQuery,
} = taskListApiSlice;