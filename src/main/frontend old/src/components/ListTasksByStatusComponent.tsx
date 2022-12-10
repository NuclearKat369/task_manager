import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import TaskService from '../services/TaskService';
import { BsArrowDownUp } from 'react-icons/bs';

function ListTasksByStatusComponent()  {
    const [tasks, setTasks] = useState([]);
    const [order, setOrder] = useState("ASC");
    const { statusId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        handleClick();
    }, [])

    async function handleClick() {
        const taskType = parseInt(statusId, 10);
        switch (taskType) {
            case 1: case 2: case 3: case 4: {
                const result = await TaskService.getAllTasksWithStatusId(taskType);
                setTasks(result.data);
                console.log("taskType opened: ");
                console.log(taskType);
                break;
            }
            default: {
                const result = await TaskService.getAllTasks();
                setTasks(result.data);
                console.log("taskType opened default: ");
                console.log(taskType);
            }
        }
    }

    // Переход в окно редактирования или добавления заявки
    const editTask = (taskId) => {
        navigate(`/add-task/${taskId}`);
    }

    // Удаление заявки
    const deleteTask = (taskId) => {
        TaskService.deleteTask(taskId).then(res => {
            setTasks(tasks.filter(item => item.taskId !== taskId));
        });
    }

    // Сортировка заявок по ID
    const sortById = (col) => {
        if (order === "ASC") {
            const sorted = [...tasks].sort((a, b) =>
                a[col] > b[col] ? 1 : -1
            );
            setTasks(sorted);
            setOrder("DESC");
        }
        if (order === "DESC") {
            const sorted = [...tasks].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            );
            setTasks(sorted);
            setOrder("ASC");
        }
    }

    const sortData = (col) => {
        if (order === "ASC") {
            const sorted = [...tasks].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setTasks(sorted);
            setOrder("DESC");
        }
        if (order === "DESC") {
            const sorted = [...tasks].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setTasks(sorted);
            setOrder("ASC");
        }
    }

    return (
        <div className="App">
            <h1>Список задач</h1>

            <div className="input-group">
                <input type="search" className="form-control col-md-7 rounded" placeholder="Введите запрос"
                    aria-label="Search" aria-describedby="search-addon" />
                <button type="button" className="btn btn-outline-primary col-md-2">Поиск</button>
            </div>

            <table className="table table-hover table-light" align="center">
                <thead>
                    <tr>

                        <th scope="col" onClick={() => sortById("taskId")}>Номер <BsArrowDownUp /></th>

                        <th scope="col" onClick={() => sortData("taskName")}>Тема <BsArrowDownUp /></th>
                        <th scope="col" onClick={() => sortData("statusName")}>Статус <BsArrowDownUp /></th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                {tasks.map(function fn(item) {
                    return (
                        <tbody>
                            <tr key={item.taskId}>
                                <td>{item.taskId}</td>
                                <td>{item.taskName}</td>
                                <td>{item.statusName}</td>
                                <td>
                                    <button onClick={() => editTask(item.taskId)}
                                        className="btn btn-info">Открыть</button>
                                    <button style={{ marginLeft: "10px" }}
                                        onClick={() => deleteTask(item.taskId)}
                                        className="btn btn-danger">Удалить</button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
}

export default ListTasksByStatusComponent;
