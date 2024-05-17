import { apiSlice } from "./apiSlice";
import { FILEDATA_API_BASE_URL } from "./globalConst";

export const taskFileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFiles: builder.query<any, { taskId: string }>({
            query: (arg) => {
                const { taskId } = arg;
                console.log("getFiles ARG!!!!! ", arg);
                return {
                    url: FILEDATA_API_BASE_URL + `/task/${taskId}`,
                }
            }
        }),
        getFileById: builder.query<any, { fileId: string }>({
            query: (arg) => {
                const { fileId } = arg;
                console.log("ARG!!!!! ", arg);
                return {
                    url: FILEDATA_API_BASE_URL + `/data/${fileId}`,
                }
            }
        }),
        // Обращение к API для удаления из БД заявки с переданным ID
        deleteFile: builder.mutation({
            query: (fileId: any) => ({
                url: FILEDATA_API_BASE_URL + `/${fileId}`,
                method: 'DELETE',
            }),
        }),
    })
})

export const {
    useGetFilesQuery,
    useGetFileByIdQuery,
    useDeleteFileMutation,
} = taskFileApiSlice;