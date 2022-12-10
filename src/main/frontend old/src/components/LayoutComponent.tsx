import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import StatusService from '../services/StatusService';
import TaskService from '../services/TaskService';


function LayoutComponent() {

    const [tasksWithStatus, setTasksWithStatus] = useState([]);
    const [taskCountNew, setTaskCountNew] = useState(0);
    const [taskCountInProgress, setTaskCountInProgres] = useState(0);
    const [taskCountDone, setTaskCountDone] = useState(0);
    const [taskCountClosed, setTaskCountClosed] = useState(0);
    const [taskCountAll, setTaskCountAll] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        handleClick();
    }, []);

    async function handleClick() {

        const allStatuses = await TaskService.countAllTasks();
        setTaskCountAll(allStatuses.data);

        const byStatus = await StatusService.countTasksByStatus();
        setTasksWithStatus(byStatus.data);

        // Подсчёт количества заявок с определённым статусом
        const newFound = byStatus.data.find(item => item.statusId === 1);
        const inProgressFound = byStatus.data.find(item => item.statusId === 2);
        const doneFound = byStatus.data.find(item => item.statusId === 3);
        const closedFound = byStatus.data.find(item => item.statusId === 4);

        setTaskCountNew(newFound.statusCount);
        setTaskCountInProgres(inProgressFound.statusCount);
        setTaskCountDone(doneFound.statusCount);
        setTaskCountClosed(closedFound.statusCount);

        console.log("tasksWithStatus Array");
        console.log(byStatus.data);
    }

    const handleButtonClick = (e) => {
        const key = e;
        console.log("key: ");
        console.log(key);
        switch (key) {
            case 1: case 2: case 3: case 4: {
                console.log("key in Switch: ");
                console.log(key);
                navigate(`tasks/${key}`);
                // window.location.reload();
                break;
            }
            default: {
                console.log("key in Switch: ");
                console.log(key);
                navigate(`tasks/all`);
                // window.location.reload();
                console.log("Отображение всех заявок");
            }
        }
    }


    // Переход в окно редактирования или добавления заявки
    const editTask = (taskId) => {
        navigate(`/add-task/${taskId}`);
    }

    // const showAllTasks = () => {
    //     navigate('tasks/all');
    //     window.location.reload();
    // }

    const showInfo = () => {
        navigate(`info`)
    }


    return (
        <div className="container">
            <div className="row">
                <div className="btn-group" role="group">
                    <button
                        type="button"
                        className="btn btn-secondary text-start"
                        onClick={() => editTask('-1')}>Создать задачу</button>
                    <button
                        type="button"
                        className="btn btn-secondary text-start">Поиск</button>
                    <button
                        type="button"
                        className="btn btn-secondary text-start"
                        onClick={() => handleButtonClick(0)}>
                        <div className="container">
                            <div className="row">
                                <div className="col-3">
                                    ({taskCountAll})
                                </div>
                                <div className="col-9">
                                    Все заявки
                                </div>
                            </div>
                        </div>
                    </button>

                    <button type="button" className="btn btn-secondary text-start">Учётная запись</button>
                    <button
                        type="button"
                        className="btn btn-secondary text-start"
                        onClick={() => showInfo()}>Справочная информация</button>
                    <button type="button" className="btn btn-secondary">Выход</button>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-3">
                    <div className="btn-group-vertical btn-group-lg" role="group">
                        <button
                            type="button"
                            className="btn btn-secondary text-start"
                            onClick={() => handleButtonClick(1)}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-3">
                                        ({taskCountNew})
                                    </div>
                                    <div className="col-9">
                                        Новые
                                    </div>
                                </div>
                            </div>
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary text-start"
                            onClick={() => handleButtonClick(2)}>
                            <div className="container">
                                <div className="row justify-content-start">
                                    <div className="col-3 justify-content-start">
                                        ({taskCountInProgress})
                                    </div>
                                    <div className="col-9 justify-content-start">
                                        В работе
                                    </div>
                                </div>
                            </div>
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary text-start"
                            onClick={() => handleButtonClick(3)}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-3">
                                        ({taskCountDone})
                                    </div>
                                    <div className="col-9">
                                        Решённые
                                    </div>
                                </div>
                            </div>
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary text-start"
                            onClick={() => handleButtonClick(4)}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-3">
                                        ({taskCountClosed})
                                    </div>
                                    <div className="col-9">
                                        Завершённые
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="col-9 justify-content-start">
                    <Outlet />
                </div>

            </div>
        </div>

    );
}

export default LayoutComponent;