import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { fetchAllTaskStatuses } from '../features/taskStatusSlice';
import { useAppDispatch, useAppSelector } from '../features/store';
import { fetchAllTasks, fetchTasksByStatusId } from '../features/taskListSlice';
import { fetchAllTaskSubtypes } from '../features/taskSubtypeSlice';
import { fetchTaskByTaskId } from '../features/taskSlice';
import { TaskStatusType } from '../features/enums';
import { countAllTasks, countTasksByStatus, getAllTasksCountValue, getTasksByStatusCountValue } from '../features/taskCountSlice';

function LayoutComponent() {
    const [tasksWithStatus, setTasksWithStatus] = useState(useAppSelector(getTasksByStatusCountValue));
    const [taskCountNew, setTaskCountNew] = useState(0);
    const [taskCountInProgress, setTaskCountInProgres] = useState(0);
    const [taskCountDone, setTaskCountDone] = useState(0);
    const [taskCountClosed, setTaskCountClosed] = useState(0);
    const [taskCountAll, setTaskCountAll] = useState(useAppSelector(getAllTasksCountValue));

    const [searchTaskId, setSearchTaskId] = useState("");

    const params = useParams();
    const [taskStatusId, setTaskStatusId] = useState(params.statusId);
    const [taskId, setTaskId] = useState(params.id)
    console.log("params: ", params)
    console.log("taskId: ", taskId)

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        handleClick();
    }, []);

    async function handleClick() {
        dispatch(countAllTasks());
        dispatch(countTasksByStatus());
        // requestCount();

        const newFound = tasksWithStatus.find(item => item.statusId === 1);
        const inProgressFound = tasksWithStatus.find(item => item.statusId === 2);
        const doneFound = tasksWithStatus.find(item => item.statusId === 3);
        const closedFound = tasksWithStatus.find(item => item.statusId === 4);

        setTaskCountNew(newFound.statusCount);
        setTaskCountInProgres(inProgressFound.statusCount);
        setTaskCountDone(doneFound.statusCount);
        setTaskCountClosed(closedFound.statusCount);

        if (taskStatusId !== undefined) {
            handleButtonClick(taskStatusId);
        }
        else if (taskId !== undefined) {
            handleGetTask(taskId);
        }
        else {
            navigate("/not-found");
        }
    }

    const requestCount = () => {
        dispatch(countAllTasks());
        dispatch(countTasksByStatus());
        console.log("after count dispatch");
    }

    const handleGetTask = (taskId) => {
        setTaskId(taskId);
        setTaskStatusId(undefined);
        dispatch(fetchAllTaskStatuses());
        dispatch(fetchAllTaskSubtypes());
        dispatch(fetchTaskByTaskId(taskId));
        navigate(`/tasks/task/${taskId}`)

    }

    const handleButtonClick = (value) => {
        const key = TaskStatusType[value.toUpperCase()];
        setTaskStatusId(key);
        setTaskId(undefined);
        switch (key) {
            case "1": case "2": case "3": case "4": {
                dispatch(fetchTasksByStatusId(`${key}`));
                break;
            }
            default: {
                dispatch(fetchAllTasks());
                break;
            }
        }
        requestCount();
        navigate(`/tasks/${value}`);

    }

    // Переход в окно редактирования или добавления заявки
    const addTask = (taskId) => {
        setTaskId(taskId);
        setTaskStatusId(undefined);
        console.log("taskID in addTask: ", taskId);
        dispatch(fetchAllTaskStatuses());
        dispatch(fetchAllTaskSubtypes());
        console.log("taskId in addTask before if: ", taskId);
        if (taskId !== "-1") {
            dispatch(fetchTaskByTaskId(taskId));
            console.log("taskId in addTask after if: ", taskId);
        }
        navigate(`/tasks/task/${taskId}`);
    }

    // Поиск задачи по номеру
    const searchTask = (e) => {
        e.preventDefault();

        dispatch(fetchTaskByTaskId(searchTaskId));
        dispatch(fetchAllTaskStatuses());
        dispatch(fetchAllTaskSubtypes());

        navigate(`/tasks/task/${searchTaskId}`);
    }

    const changeSearchTaskIdHandler = e => {
        setSearchTaskId(e.target.value);
    }

    const showInfo = () => {
        navigate(`/info`)
    }

    const showContacts = () => {
        navigate(`/contacts`)
    }

    return (
        <div className="d-flex flex-conatiner">
            <div className="d-flex flex-column flex-grow-1">
                <div className="d-flex flex-row flex-grow-1 px-1">
                    <nav
                        className="navbar navbar-expand-lg navbar-light bg-light flex-grow-1">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/tasks/all">
                                Менеджер заявок
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active enable-button-pointers" aria-current="page"
                                            href="" onClick={() => handleButtonClick(
                                                Object.keys(TaskStatusType)[Object.values(TaskStatusType).indexOf(TaskStatusType.ALL)].toLowerCase())
                                            }>
                                            Главная
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="">Поиск</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link active dropdown-toggle" href="" id="navbarDropdown"
                                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Учётная запись
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link active dropdown-toggle" href="" id="navbarDropdown"
                                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Справочная информация
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" onClick={() => showInfo()}>
                                                Инструкция
                                            </a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" onClick={() => showContacts()}>
                                                Контакты
                                            </a></li>
                                        </ul>
                                    </li>
                                </ul>

                                <form className="d-flex" onSubmit={searchTask}>
                                    <input
                                        className="form-control me-2" type="search" pattern="\d*"
                                        onInvalid={e =>
                                            (e.target as HTMLInputElement).setCustomValidity("Пожалуйста, введите номер заявки.")}
                                        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                                        placeholder="Номер заявки" aria-label="Search"
                                        value={searchTaskId} onChange={changeSearchTaskIdHandler} />
                                    <button className="btn btn-layout" type="submit">Поиск</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="d-flex flex-row justify-content-start">
                    <div className="d-flex flex-column flex-shrink-1 p-2">
                        <br />
                        <br />
                        <div className="btn-group-vertical btn-group-lg" role="group">
                            <button
                                type="button"
                                className="btn btn-layout text-start fw-bold"
                                onClick={() => addTask("-1")}>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row">
                                        <div className="p-1">
                                            Создать задачу
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <button
                                type="button"
                                className="btn btn-layout text-start"
                                onClick={() => handleButtonClick(
                                    Object.keys(TaskStatusType)[Object.values(TaskStatusType).indexOf(TaskStatusType.ALL)].toLowerCase())
                                }>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row">
                                        <div className="p-1 flex-grow-1">
                                            Все заявки
                                        </div>
                                        <div className="p-1 flex-shrink-1">
                                            <span className="badge bg-secondary">{taskCountAll}</span>
                                        </div>
                                    </div>
                                </div>
                            </button>

                            <button
                                type="button"
                                className="btn btn-layout text-start"
                                onClick={() => handleButtonClick(
                                    Object.keys(TaskStatusType)[Object.values(TaskStatusType).indexOf(TaskStatusType.NEW)].toLowerCase()
                                )}>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row">
                                        <div className="p-1 flex-grow-1">
                                            Новые
                                        </div>
                                        <div className="p-1 flex-shrink-1">
                                            <span className="badge bg-secondary">{taskCountNew}</span>
                                        </div>
                                    </div>
                                </div>
                            </button>

                            <button
                                type="button"
                                className="btn btn-layout text-start"
                                onClick={() => handleButtonClick(
                                    Object.keys(TaskStatusType)[Object.values(TaskStatusType).indexOf(TaskStatusType.IN_PROGRESS)].toLowerCase()
                                )}>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row">
                                        <div className="p-1 flex-grow-1">
                                            В работе
                                        </div>
                                        <div className="p-1 flex-shrink-1">
                                            <span className="badge bg-secondary">{taskCountInProgress}</span>
                                        </div>
                                    </div>
                                </div>
                            </button>

                            <button
                                type="button"
                                className="btn btn-layout text-start"
                                onClick={() => handleButtonClick(
                                    Object.keys(TaskStatusType)[Object.values(TaskStatusType).indexOf(TaskStatusType.DONE)].toLowerCase()
                                )}>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row">
                                        <div className="p-1 flex-grow-1">
                                            Решённые
                                        </div>
                                        <div className="p-1 flex-shrink-1">
                                            <span className="badge bg-secondary">{taskCountDone}</span>
                                        </div>

                                    </div>
                                </div>
                            </button>
                            <button
                                type="button"
                                className="btn btn-layout text-start"
                                onClick={() => handleButtonClick(
                                    Object.keys(TaskStatusType)[Object.values(TaskStatusType).indexOf(TaskStatusType.CLOSED)].toLowerCase()
                                )}>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row">
                                        <div className="p-1 flex-grow-1">
                                            Завершённые
                                        </div>
                                        <div className="p-1 flex-shrink-1">
                                            <span className="badge bg-secondary">{taskCountClosed}</span>
                                        </div>

                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="d-flex flex-column flex-grow-1 p-2 justify-content-start">
                        <Outlet />
                    </div>
                </div>
            </div >
        </div>
    );
}

export default LayoutComponent;