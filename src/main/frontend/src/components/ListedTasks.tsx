import { useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useDeleteTaskMutation } from '../features/taskListApiSlice';

function ListedTasks({ sorted, setSorted, order, setOrder, sortBy, sortRequest, setSortRequest }) {

    const allTasks = sorted;
    const [deleteTask] = useDeleteTaskMutation();

    const navigate = useNavigate();

    useEffect(() => {
        console.log("sortRequest: ", sortRequest)
        if (sortRequest === true)
            if (sortBy === "taskId") {
                sortById(sortBy);
            }
            else if (sortBy === "createdAt") {
                sortByDate(sortBy);
            }
            else if (sortBy === "employeeInCharge") {
                sortDataWithNull(sortBy);
            }
            else if (sortBy === "status") {
                sortDataByStatus(sortBy);
            }
            else {
                sortData(sortBy);
            }
    }, [sortRequest]);

    useEffect(() => {
    }, []);

    // Форматирование даты
    const getDate = (date) => {
        const createdAt = new Date(date);
        const createdDate = createdAt.toLocaleDateString("ru-RU");
        const createdTime = createdAt.toLocaleTimeString("ru-RU");
        return (
            `${createdDate} ${createdTime}`
        )
    }


    let renderTasks;
    renderTasks = sorted.map((item) => {
        return (
            <tr key={item.taskId}
                onClick={() => {
                    editTask(item.taskId)
                }}
            >
                <th scope="row" className="text-end px-3">{item.taskId}</th>
                <td className="text-start px-2 text-truncate" style={{ maxWidth: '200px' }}>{item.taskName}</td>
                <td className="text-start px-2 text-truncate">{item.status.statusName}</td>
                {/* Удаление заявки */}
                {/* <td>
                    <button style={{ marginLeft: "10px" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            removeTask(item.taskId)
                        }}
                        className="btn btn-danger"><BsTrash />
                    </button>
                </td> */}
                <td className="text-start px-2 text-truncate">{getDate(item.taskCreatedAt)}</td>
                <td className="text-start px-2 text-truncate" style={{ maxWidth: '300px' }}>

                    {item.employeeInCharge
                        ? (<>{item.employeeInCharge.lastName} {item.employeeInCharge.firstName} {item.employeeInCharge.patronymic}</>)
                        : ("")
                    }
                </td>
            </tr>
        );
    });

    // Переход в окно редактирования или добавления заявки
    const editTask = (taskId) => {
        if (taskId !== '-1') {
            navigate(`/task/${taskId}`);
        }
    }

    // Удаление заявки
    const removeTask = async (taskId) => {
        await deleteTask(taskId);
        setSorted(sorted.filter(item => item.taskId !== taskId));
        navigate("/tasks/all");
    }


    // Сортировка заявок по ID
    const sortById = (col) => {
        if (order === "ASC") {
            setSorted([...allTasks].sort((a, b) =>
                a[col] > b[col] ? 1 : -1
            ));
            setOrder("DESC");
        }
        if (order === "DESC") {
            setSorted([...allTasks].sort((a, b) =>
                a[col] < b[col] ? 1 : -1
            ));
            setOrder("ASC");
        }
        setSortRequest(false);
    }

    // Сортировка колонок по алфавиту
    const sortData = (col) => {
        if (order === "ASC") {
            setSorted([...allTasks].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            ));
            setOrder("DESC");
        }
        if (order === "DESC") {
            setSorted([...allTasks].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            ));
            setOrder("ASC");
        }
        setSortRequest(false);
    }

    // Сортировка колонок по статусу
    const sortDataByStatus = (col) => {
        if (order === "ASC") {
            setSorted([...allTasks].sort((a, b) =>
                a[col].statusName.toLowerCase() > b[col].statusName.toLowerCase() ? 1 : -1
            ));
            setOrder("DESC");
        }
        if (order === "DESC") {
            setSorted([...allTasks].sort((a, b) =>
                a[col].statusName.toLowerCase() < b[col].statusName.toLowerCase() ? 1 : -1
            ));
            setOrder("ASC");
        }
        setSortRequest(false);
    }


    // Сортировка колонок по алфавиту с пустыми строками
    const sortDataWithNull = (col) => {
        if (order === "ASC") {
            setSorted([...allTasks].sort((a, b) => {
                // Проверка пустых значений
                if (a[col] && b[col]) {
                    return (
                        a[col].lastName.toLowerCase() > b[col].lastName.toLowerCase() ? 1 : -1
                    )
                }
                else if (a[col]) {
                    return 1;
                }
                else if (b[col]) {
                    return -1;
                }
            }
            ));
            setOrder("DESC");
        }
        if (order === "DESC") {
            setSorted([...allTasks].sort((a, b) => {
                // Проверка пустых значений
                if (a[col] && b[col]) {
                    return (
                        a[col].lastName.toLowerCase() < b[col].lastName.toLowerCase() ? 1 : -1
                    )
                }
                else if (a[col]) {
                    return -1;
                }
                else if (b[col]) {
                    return 1;
                }
            }
            ));
            setOrder("ASC");
        }
        setSortRequest(false);
    }

    // Сортировка заявок по дате
    const sortByDate = (col) => {
        if (order === "ASC") {
            setSorted([...allTasks].sort((a, b) =>
                Date.parse(a[col]) > Date.parse(b[col]) ? 1 : -1
            ));
            setOrder("DESC");
        }
        if (order === "DESC") {
            setSorted([...allTasks].sort((a, b) =>
                Date.parse(a[col]) < Date.parse(b[col]) ? 1 : -1
            ));
            setOrder("ASC");
        }
        setSortRequest(false);
    }

    return (
        <>
            {renderTasks}
        </>
    );
}

export default ListedTasks;