import { apiSlice } from "../services/apiSlice";

const FILEDATA_API_BASE_URL = "http://localhost:8080/files";

export const taskFileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFiles: builder.query<any, { taskId: string }>({
            query: (arg) => {
                const { taskId } = arg;
                console.log("getFiles ARG!!!!! ", arg);
                return {
                    url: FILEDATA_API_BASE_URL + "/" + taskId,
                }
            }
        }),
        getFileById: builder.query<any, { fileId: string }>({
            query: (arg) => {
                const { fileId } = arg;
                console.log("ARG!!!!! ", arg);
                return {
                    url: FILEDATA_API_BASE_URL + "/data/" + fileId,
                }
            }
        })
    })
})
// Обращение к API для загрузки в БД файла
// uploadFile(formData) {
//     return axios.post(FILEDATA_API_BASE_URL + "/uploadFile", formData);
// }

// getFileById(fileId) {
//     return axios.get(FILEDATA_API_BASE_URL + "/data/" + fileId, { responseType: "blob" })
// }

// // Обращение к API для удаления из БД заявки с переданным ID
// deleteFile(fileId) {
//     return axios.delete(FILEDATA_API_BASE_URL + "/" + fileId)
// }

export const {
    useGetFilesQuery,
    useGetFileByIdQuery,
} = taskFileApiSlice;