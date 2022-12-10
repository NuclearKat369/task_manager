import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAllTaskStatuses, getTaskStatusErrors, getTaskStatusStatus } from '../features/taskStatusSlice';
import { useAppSelector } from '../features/store';
import TaskService from '../services/TaskService';
import { getAllTaskSubtypes } from '../features/taskSubtypeSlice';
import { getTask } from '../features/taskSlice';

function CreateOrUpdateTaskComponent() {

    const navigate = useNavigate();
    const params = useParams();
    console.log("params in create or update", params.id)

    const task = useAppSelector(getTask);

    const [taskId, setTaskId] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskText, setTaskText] = useState("");

    const [taskStatusId, setTaskStatusId] = useState("");
    const [taskStatusName, setTaskStatusName] = useState("");

    const [taskSubtypeId, setTaskSubtypeId] = useState("");
    const [taskSubtypeName, setTaskSubtypeName] = useState("");

    const subtypes = useAppSelector(getAllTaskSubtypes);

    const statuses = useAppSelector(getAllTaskStatuses);

    useEffect(() => {
        handleClick();
    }, [taskId])

    // Подгрузка данных при переходе на страницу
    async function handleClick() {
        if (params.id !== '-1') {
            task.map((item) => {
                setTaskId(item.taskId);
                setTaskName(item.taskName);
                setTaskText(item.taskText);
                setTaskStatusId(item.statusId);
                setTaskStatusName(item.statusName);
                setTaskSubtypeId(item.subtypeId);
                setTaskSubtypeName(item.subtypeName);
            })
        }
        else {
            setTaskId("");
            setTaskName("");
            setTaskText("");
            setTaskStatusId("");
            setTaskStatusName("");
            setTaskSubtypeId("");
            setTaskSubtypeName("");
        }
    }

    // Обработчик изменения поля "Тема"
    const changeNameHandler = e => {
        setTaskName(e.target.value);
    }

    // Обработчик измения поля "Описание"
    const changeTextHandler = e => {
        setTaskText(e.target.value);
    }

    // Обработчик изменения статуса в выпадающем меню
    const changeStatusHandler = e => {

        const id = e.target.value;

        const found = statuses.find(item => { return item.statusId == id });
        setTaskStatusId(found.statusId);
        setTaskStatusName(found.statusName);

    }

    // Обработчик изменения статуса в выпадающем меню
    const changeSubtypeHandler = e => {

        const id = e.target.value;
        const found = subtypes.find(item => { return item.subtypeId == id });
        console.log(found);
        setTaskSubtypeId(found.subtypeId);
        setTaskSubtypeName(found.subtypeName);

    }

    // Сохранение новой или изменение имеющейся заявки
    const updateTask = (e) => {
        e.preventDefault();
        var Task = {
            statusId: taskStatusId,
            statusName: taskStatusName,
            subtypeId: taskSubtypeId,
            subtypeName: taskSubtypeName,
            taskName: taskName,
            taskText: taskText
        };

        // Если заявка новая (значение -1), то она добавляется в БД при сохранении
        if (params.id === "-1") {
            TaskService.createTask(Task).then(res => {
                navigate("/tasks/all");
            });
        }
        // Если заявка пришла с ID, то будет изменена существующая заявка
        else {
            TaskService.updateTask(taskId, Task).then(res => {
                navigate("/tasks/all");
            });
        }
    }

    // Название в "шапке" в зависимости от того, новая заявка или имеющаяся
    const getTitle = () => {
        if (params.id === "-1") {
            return "Новая заявка";
        }
        else {
            return `Заявка № ${taskId}`
        }
    }

    // Обработчик отображения поля статуса
    const handleTaskStatus = () => {

        // Если заявка новая, то поле статуса изменить нельзя, оно по умолчанию имеет значение "Новая"
        if (params.id === "-1") {
            return (
                <select className="form-select" disabled>
                    <option>Новая</option>
                </select>
            )
        }

        /* Если изменяется существующая заявка, то по умолчанию отображается её статус, его можно менять,
         выбрав в выпадающем меню нужный */
        else {
            return (
                <select className="form-select"
                    onChange={changeStatusHandler}>
                    <option selected disabled>
                        {taskStatusName}
                    </option>
                    {statuses.map(function fn(item) {
                        return (
                            <option value={item.statusId} key={item.statusId}>{item.statusName}</option>
                        );
                    })}
                </select>
            )
        }
    }

    // Обработчик отображения поля подтипа заявки
    const handleTaskSubtype = () => {

        // Если заявка новая, то поле статуса изменить нельзя, оно по умолчанию имеет значение "Новая"
        if (params.id === "-1") {
            return (
                <select className="form-select"
                    defaultValue="" onChange={changeSubtypeHandler}>
                    <option value="" disabled>
                        Выберите тип заявки
                    </option>
                    {subtypes.map(function fn(item) {
                        return (
                            <option value={item.subtypeId} key={item.subtypeId}>{item.subtypeName}</option>
                        );
                    })}
                </select>
            )
        }

        /* Если изменяется существующая заявка, то по умолчанию отображается её статус, его можно менять,
         выбрав в выпадающем меню нужный */
        else {
            return (
                <select className="form-select"
                    defaultValue={taskSubtypeId} onChange={changeSubtypeHandler}>
                    <option value={taskSubtypeId} disabled>
                        {taskSubtypeName}
                    </option>
                    {subtypes.map(function fn(item) {
                        return (
                            <option value={item.subtypeId} key={item.subtypeId}>{item.subtypeName}</option>
                        );
                    })}
                </select>
            )
        }
    }

    const handleSubmitButton = () => {

        const warning = "Заполнены не все поля!";

        if (taskSubtypeId === '') {
            return (
                <div className="d-flex flex-column flex-grow-1 justify-content-end">
                    <div className="d-flex flex-row text-danger">
                        {warning}
                    </div>
                    <div className="d-flex flex-row flex-shrink-1 justify-content-end">
                        <button className="btn btn-success" disabled>
                            Сохранить
                        </button>
                    </div>
                </div>
            );
        }
        else if (taskName === '') {
            return (
                <div className="d-flex flex-column flex-grow-1 justify-content-end">
                    <div className="d-flex flex-row text-danger">
                        {warning}
                    </div>
                    <div className="d-flex flex-row flex-shrink-1 justify-content-end">
                        <button className="btn btn-success" disabled>
                            Сохранить
                        </button>
                    </div>
                </div>
            );
        }
        else if (taskText === '') {
            return (
                <div className="d-flex flex-column flex-grow-1 justify-content-end">
                    <div className="d-flex flex-row text-danger">
                        {warning}
                    </div>
                    <div className="d-flex flex-row flex-shrink-1 justify-content-end">
                        <button className="btn btn-success" disabled>
                            Сохранить
                        </button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="d-flex flex-column flex-grow-1 justify-content-end">
                    <div className="d-flex flex-row"></div>
                    <div className="d-flex flex-row flex-shrink-1 justify-content-end">
                        <button className="btn btn-success"
                            onClick={updateTask}>
                            Сохранить
                        </button>
                    </div>
                </div>
            );
        }
        
    }


    return (
        <div className="d-flex flex-row" key={params.id}>
            <div className="d-flex flex-column flex-shrink-1 fs-5 px-1 text-start">
                <div className="d-flex flex-row">
                    <h1>{getTitle()}</h1>
                </div>
                Статус
                <div className="d-flex flex-row py-1">
                    {handleTaskStatus()}
                </div>
                Тип
                <div className="d-flex flex-row py-1">
                    {handleTaskSubtype()}
                </div>
                <div className="d-flex flex-row py-1 fs-6 justify-content-end py-2">
                    {handleSubmitButton()}
                    <div className="d-flex flex-column flex-shrink-1 justify-content-end">
                        <button className='btn btn-danger'
                            onClick={() => {
                                navigate(-1);
                                console.log(taskSubtypeId, taskSubtypeName)
                            }}
                            style={{ marginLeft: "10px" }}>Отменить</button>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-grow-1 flex-shrink-0 fs-5 px-3">
                <div className="d-flex flex-row py-1">
                    Тема
                </div>
                <div className="d-flex flex-row py-1">
                    <input type='text' placeholder='Введите тему' name='taskName' className='form-control'
                        value={taskName} onChange={changeNameHandler} />
                </div>
                <div className="d-flex flex-row py-1">
                    Описание
                </div>
                <div className="d-flex flex-row py-1">
                    <textarea placeholder='Опишите суть вопроса' name='taskText' className='form-control mh-100'
                        value={taskText} onChange={changeTextHandler}
                        style={{ height: '200px', resize: 'none' }} />
                </div>
            </div>
        </div >
    );
}

export default CreateOrUpdateTaskComponent;


