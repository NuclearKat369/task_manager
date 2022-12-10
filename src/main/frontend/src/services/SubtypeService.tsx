import axios from "axios";

const SUBTYPE_API_BASE_URL = "http://localhost:8080/showSubtype";

class SubtypeService {

    // Обращение к API для получения из БД всех статусов
    getSubtypes() {
        return axios.get(SUBTYPE_API_BASE_URL + "/getSubtype/all");
    }

    // Обращение к API для получения из БД статуса с переданным ID
    getSubtype(subtypeId) {
        return axios.get(SUBTYPE_API_BASE_URL + "/getSubtype/" + subtypeId);
    }
}

export default new SubtypeService();

