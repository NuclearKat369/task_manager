import axios from "axios";

const FILEDATA_API_BASE_URL = "http://localhost:8080/files";

class FileService {

    // Обращение к API для загрузки в БД файла
    uploadFile(formData) {
        return axios.post(FILEDATA_API_BASE_URL + "/uploadFile", formData);
    }

    // Обращение к API для удаления из БД заявки с переданным ID
    deleteFile(fileId) {
        return axios.delete(FILEDATA_API_BASE_URL + "/" + fileId)
    }

}

export default new FileService();