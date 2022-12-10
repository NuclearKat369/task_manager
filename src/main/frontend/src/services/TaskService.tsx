import axios from "axios";

const TASK_API_BASE_URL = "http://localhost:8080/tasks";

class TaskService {

    // Обращение к API для получения из БД всех заявок
    getAllTasks() {
        return axios.get(TASK_API_BASE_URL);
    }

    // Обращение к API для добавления в БД новой заявки
    createTask(task) {
        return axios.post(TASK_API_BASE_URL, task);
    }

    // Обращение к API для получения из БД заявки с переданным ID
    getTaskById(taskId) {
        return axios.get(TASK_API_BASE_URL + "/" + taskId);
    }

    // Обращение к API для обновления в БД заявки с переданным ID
    updateTask(taskId, task) {
        return axios.put(TASK_API_BASE_URL + "/" + taskId, task);
    }

    // Обращение к API для удаления из БД заявки с переданным ID
    deleteTask(taskId) {
        return axios.delete(TASK_API_BASE_URL + "/" + taskId)
    }

    countAllTasks() {
        return axios.get(TASK_API_BASE_URL + "/getNumberOfAllTasks")
    }

    getAllTasksWithStatusId(statusId) {
        return axios.get(TASK_API_BASE_URL + "/getStatus/" + statusId)
    }
}

export default new TaskService();

