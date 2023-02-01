import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../features/store';
import { TaskStatusType } from '../features/enums';
import { setCountAllTasks, setCountTasksByStatus } from '../features/taskCountSlice';
import { useCountTasksByStatusQuery, useGetStatusesQuery } from '../features/taskStatusApiSlice';
import { useCountAllTasksQuery, useCountTasksWhereCreatorQuery, useCountTasksWhereInChargeQuery } from '../features/taskListApiSlice';
import { useGetSubtypesQuery } from '../features/taskSubtypeApiSlice';
import { setSubtypes } from '../features/taskSubtypeSlice';
import { selectCurrentUuid } from '../features/auth/authSlice';

function SideComponent() {

    const currentUuid = useAppSelector(selectCurrentUuid);
    console.log("currentUuid BEFORE useCountTasksWhereCreatorQuery", currentUuid)

    const tasksWithStatus = useCountTasksByStatusQuery();
    const countAllTasks = useCountAllTasksQuery();
    const allSubtypes = useGetSubtypesQuery();
    const allStatuses = useGetStatusesQuery();
    const allWhereCreator = useCountTasksWhereCreatorQuery({ employeeId: currentUuid }, { refetchOnMountOrArgChange: true });
    const allWhereInCharge = useCountTasksWhereInChargeQuery({ employeeId: currentUuid }, { refetchOnMountOrArgChange: true });

    const [taskCountNew, setTaskCountNew] = useState(0);
    const [taskCountInProgress, setTaskCountInProgres] = useState(0);
    const [taskCountDone, setTaskCountDone] = useState(0);
    const [taskCountClosed, setTaskCountClosed] = useState(0);
    const [taskCountCreator, setTaskCountCreator] = useState(0);
    const [taskCountInCharge, setTaskCountInCharge] = useState(0);

    const params = useParams();
    const [taskStatusId, setTaskStatusId] = useState();

    console.log("params SideComponent: ", params.statusId)

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {

    }, [params])

    useEffect(() => {
        // Отображение данных о количестве заявок при наличии
        if (countAllTasks.isSuccess && tasksWithStatus.isSuccess) {
            if (allWhereCreator.isSuccess && allWhereInCharge.isSuccess) {
                handleClick();
            }
        }
        console.log("countAllTasks.data: ", countAllTasks);
        console.log("tasksWithStatus.data: ", tasksWithStatus);
        // handleClick();
    }, [tasksWithStatus, countAllTasks, allWhereCreator, allWhereInCharge]);

    if (countAllTasks.isSuccess && tasksWithStatus.isSuccess) {
        dispatch(setCountAllTasks(countAllTasks.data));
        dispatch(setCountTasksByStatus(tasksWithStatus.data));
    }

    if (allSubtypes.isSuccess) {
        dispatch(setSubtypes({
            value: allSubtypes.data,
            isError: allSubtypes.isError,
            isFetching: allSubtypes.isFetching,
            isLoading: allSubtypes.isLoading,
            isSuccess: allSubtypes.isSuccess
        }))
    }

    // Заполнение данных о количестве заявок всех типов
    async function handleClick() {

        const newFound = tasksWithStatus.data.find(item => item.statusId === 1);
        const inProgressFound = tasksWithStatus.data.find(item => item.statusId === 2);
        const doneFound = tasksWithStatus.data.find(item => item.statusId === 3);
        const closedFound = tasksWithStatus.data.find(item => item.statusId === 4);

        setTaskCountNew(newFound.statusCount);
        setTaskCountInProgres(inProgressFound.statusCount);
        setTaskCountDone(doneFound.statusCount);
        setTaskCountClosed(closedFound.statusCount);
        if (allWhereCreator.isSuccess)
            setTaskCountCreator(allWhereCreator.data);
        if (allWhereInCharge.isSuccess)
            setTaskCountInCharge(allWhereInCharge.data);

        if (taskStatusId !== undefined) {
            handleButtonClick(taskStatusId);
        }
        else {
            navigate("/not-found");
        }
    }

    // Обработчик нажатия кнопок на боковой панели 
    const handleButtonClick = (value) => {
        const key = TaskStatusType[value.toUpperCase()];
        setTaskStatusId(key);
        navigate(`/tasks/${value}`);
        console.log("value, key: ", value, key);
    }

    // Переход в окно добавления заявки
    const addTask = async (taskId) => {
        console.log("taskID in addTask: ", taskId);
        await allStatuses;
        navigate(`/task/${taskId}`);
    }

    let content;
    if (countAllTasks.isLoading || tasksWithStatus.isLoading) {
        content = <h1>Loading</h1>
    }
    else if (countAllTasks.isSuccess && tasksWithStatus.isSuccess)
        content = (
            <div className="btn-group-vertical bg-theme rounded btn-group-lg" role="group">

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
                            <div className="flex-grow-1 px-2">
                                Все заявки
                            </div>
                            <div className="flex-shrink-1">
                                <span className="badge bg-secondary">{countAllTasks.data}</span>
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
                            <div className="flex-grow-1 px-2">
                                Новые
                            </div>
                            <div className="flex-shrink-1">
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
                            <div className="flex-grow-1 px-2">
                                В работе
                            </div>
                            <div className="flex-shrink-1">
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
                            <div className="flex-grow-1 px-2">
                                Решённые
                            </div>
                            <div className="flex-shrink-1">
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
                            <div className="flex-grow-1 px-2">
                                Завершённые
                            </div>
                            <div className="flex-shrink-1">
                                <span className="badge bg-secondary">{taskCountClosed}</span>
                            </div>
                        </div>
                    </div>
                </button>
                <br />
                <br />
                <button
                    type="button"
                    className="btn btn-layout text-start"
                    onClick={() => navigate(`tasks/creator`)}>
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row">
                            <div className="flex-grow-1 px-2">
                                Созданные мной
                            </div>
                            <div className="flex-shrink-1">
                                <span className="badge bg-secondary">{taskCountCreator}</span>
                            </div>
                        </div>
                    </div>
                </button>

                <button
                    type="button"
                    className="btn btn-layout text-start"
                    onClick={() => navigate(`tasks/in-charge`)}>
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row">
                            <div className="flex-grow-1 px-2">
                                Назначенные мне
                            </div>
                            <div className="flex-shrink-1">
                                <span className="badge bg-secondary">{taskCountInCharge}</span>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        )
    else if (countAllTasks.isError || tasksWithStatus.isError) {
        content = <p>{JSON.stringify((countAllTasks.isError, tasksWithStatus.isError))}</p>
    }

    return content;
}

export default SideComponent;