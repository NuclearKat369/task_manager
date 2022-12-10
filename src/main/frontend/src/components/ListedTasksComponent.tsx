import { useEffect, useState } from 'react'
import { BsArrowDownUp } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../features/store';
import { getAllTasks } from '../features/taskListSlice';
import { fetchTaskByTaskId } from '../features/taskSlice';

function ListedTasksComponent() {

    const tasks = useAppSelector(getAllTasks);

    const [order, setOrder] = useState("ASC");
    const [allTasks, setAllTasks] = useState(tasks)
    const [sorted, setSorted] = useState(allTasks);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {

    }, []);

    let renderTasks;
    renderTasks = sorted.map((item) => {
        return (
            <tbody>
                <tr key={item.taskId} onClick={() => editTask(item.taskId)}>
                    <th scope="row" className="text-end px-3">{item.taskId}</th>
                    <td className="text-start px-2">{item.taskName}</td>
                    <td className="text-start px-2">{item.statusName}</td>
                    <td>
                        {/* <button onClick={() => editTask(item.taskId)}
                            className="btn btn-layout">Открыть</button> */}
                        {/* <button style={{ marginLeft: "10px" }}
                                    onClick={() => deleteTask(item.taskId)}
                                    className="btn btn-danger">Удалить</button> */}
                    </td>
                    <td></td>
                </tr>
            </tbody>
        );
    });

    // Переход в окно редактирования или добавления заявки
    const editTask = (taskId) => {
        if (taskId !== '-1') {
            console.log("dispatch from editTask in ListedTask");
            dispatch(fetchTaskByTaskId(taskId));
        }
        navigate(`/tasks/task/${taskId}`);
    }

    // // Удаление заявки
    // const deleteTask = (taskId) => {
    //     TaskService.deleteTask(taskId).then(res => {
    //         setTasks(tasks.filter(item => item.taskId !== taskId));
    //     });
    // }


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
    }

    return (
        <div>
            <h1>Список задач</h1>

            <table className="table table-hover table-light" align="center">
                <thead>
                    <tr>
                        <th className="th-sm"
                            scope="col"
                            onClick={() => {
                                sortById("taskId")
                            }}>Номер <BsArrowDownUp /></th>
                        <th className="th-sm" scope="col"
                            onClick={() => {
                                sortData("taskName")
                            }}>Тема <BsArrowDownUp /></th>
                        <th className="th-sm" scope="col"
                            onClick={() => {
                                sortData("statusName")
                            }}>Статус <BsArrowDownUp /></th>
                        <th className="th-sm" scope="col"
                            onClick={() => {
                                sortData("statusName")
                            }}>Дата создания<BsArrowDownUp /></th>
                        <th className="th-sm" scope="col"
                            onClick={() => {
                                sortData("statusName")
                            }}>Ответственный<BsArrowDownUp /></th>
                    </tr>
                </thead>
                {renderTasks}
            </table>
        </div>
    );
}

export default ListedTasksComponent;