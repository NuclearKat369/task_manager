import { useEffect } from 'react'
import { BsTrash } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../features/store';
import { getAllTasks } from '../features/taskListNewSlice';

function ListedTasksComponent({ sorted, setSorted, order, setOrder, sortBy, sortRequest, setSortRequest }) {

    const allTasks = useAppSelector(getAllTasks);

    console.log("ALL TASKS IN ListedTasksComponent", allTasks)

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        console.log("sortRequest: ", sortRequest)
        if (sortRequest == true)
            if (sortBy === "taskId") {
                sortById(sortBy);
            }
            else {
                sortData(sortBy);
            }
    }, [sortRequest]);


    let renderTasks;
    renderTasks = sorted.map((item) => {
        return (
            <tr key={item.taskId}
                onClick={() => {
                    editTask(item.taskId)
                }}
            >
                <th scope="row" className="text-end px-3">{item.taskId}</th>
                <td className="text-start px-2">{item.taskName}</td>
                <td className="text-start px-2">{item.statusName}</td>
                <td>
                    <button style={{ marginLeft: "10px" }}
                        onClick={(e) => { e.stopPropagation(); deleteTask(item.taskId) }}
                        className="btn btn-danger"><BsTrash /></button>
                </td>
                <td></td>
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
    const deleteTask = (taskId) => {
        // dispatch(removeTask(taskId))
        //     .then(() => {
        //         setSorted(sorted.filter(item => item.taskId !== taskId));
        //     })
        //     .then(() => navigate("/tasks/all"));
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
        console.log("in sortById")
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
        console.log("in sortData")
        setSortRequest(false);
    }

    return (
        <>
            {renderTasks}
        </>
    );
}

export default ListedTasksComponent;