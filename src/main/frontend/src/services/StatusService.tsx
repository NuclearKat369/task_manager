import axios from "axios";

const STATUS_API_BASE_URL = "http://localhost:8080/showStatus";

class StatusService {

    // Обращение к API для получения из БД всех статусов
    getStatuses() {
        return axios.get(STATUS_API_BASE_URL + "/getStatus/all");
    }

    // Обращение к API для получения из БД статуса с переданным ID
    getStatus(statusId) {
        return axios.get(STATUS_API_BASE_URL + "/getStatus/" + statusId);
    }
}

export default new StatusService();

