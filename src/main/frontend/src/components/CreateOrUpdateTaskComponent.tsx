import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../features/store';
import FileUpload from './FileUpload';
import { selectTaskFiles } from '../features/taskFileSlice';
import { selectTask, setTask } from '../features/taskSlice';
import { selectAllTaskStatuses } from '../features/taskStatusSlice';
import { selectAllTaskSubtypes } from '../features/taskSubtypeSlice';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../features/taskListApiSlice';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { FILEDATA_API_BASE_URL } from '../features/globalConst';
import { useDeleteFileMutation } from '../features/taskFileApiSlice';
import { selectAllEmployees } from '../features/employeesSlice';
import TaskHistory from './TaskHistory';
import { selectCurrentRoles } from '../features/auth/authSlice';

function CreateOrUpdateTaskComponent() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const axiosPrivate = useAxiosPrivate();
    const params = useParams();
    const task = useAppSelector(selectTask);
    const taskFiles = useAppSelector(selectTaskFiles);
    const subtypes = useAppSelector(selectAllTaskSubtypes);
    const statuses = useAppSelector(selectAllTaskStatuses);
    const employeeItList = useAppSelector(selectAllEmployees);
    const currentRoles = useAppSelector(selectCurrentRoles);

    console.log("currentTask TASK IN CreateOrUpdateTaskComponent", task);

    const [taskId, setTaskId] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskText, setTaskText] = useState("");
    const [taskStatusId, setTaskStatusId] = useState("");
    const [taskStatusName, setTaskStatusName] = useState("");
    const [taskSubtypeId, setTaskSubtypeId] = useState("");
    const [taskSubtypeName, setTaskSubtypeName] = useState("");
    const [taskCreatedAt, setTaskCreatedAt] = useState("");
    const [taskCreatedBy, setTaskCreatedBy] = useState("");
    const [taskEmployeeInCharge, setTaskEmployeeInCharge] = useState(null);

    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [removeFiles, setRemoveFiles] = useState([]);

    const [createTask] = useCreateTaskMutation();
    const [updateTask] = useUpdateTaskMutation();
    const [deleteFile] = useDeleteFileMutation();

    useEffect(() => {
        console.log("useEffect[] CreateOrUpdateTaskComponent");
        console.log(task);
        handleClick();
    }, [params.id]);


    console.log("CreateOrUpdateTaskComponent FILES", files);

    // Подгрузка данных при переходе на страницу
    const handleClick = () => {

        if (params.id !== '-1') {
            [task.data].map((item) => {
                setTaskId(item.taskId);
                setTaskName(item.taskName);
                setTaskText("");
                setTaskStatusId(item.status.statusId);
                setTaskStatusName(item.status.statusName);
                setTaskSubtypeId(item.subtype.subtypeId);
                setTaskSubtypeName(item.subtype.subtypeName);
                setTaskCreatedAt(item.createdAt);
                setTaskCreatedBy(item.taskCreatorLastName + " " +
                    item.taskCreatorFirstName + " " +
                    item.taskCreatorPatronymic);
            })
            if (task.employeeInCharge != null) {
                setTaskEmployeeInCharge(task.employeeInCharge);
            }
            else {
                setTaskEmployeeInCharge(null);
            }
            setFiles(taskFiles);
        }
        else {
            setTaskId("");
            setTaskName("");
            setTaskText("");
            setTaskStatusId("");
            setTaskStatusName("");
            setTaskSubtypeId("");
            setTaskSubtypeName("");
            setTaskEmployeeInCharge([]);
            setFiles([]);
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
        const found = statuses.find(item => {
            return item.statusId == id
        });
        setTaskStatusId(found.statusId);
        setTaskStatusName(found.statusName);
    }

    // Обработчик изменения статуса в выпадающем меню
    const changeSubtypeHandler = e => {

        const id = e.target.value;
        const found = subtypes.find(item => {
            return item.subtypeId == id
        });
        setTaskSubtypeId(found.subtypeId);
        setTaskSubtypeName(found.subtypeName);
    }

    // Обработчик изменения ответственного в выпадающем меню
    const changeEmployeeInChargeHandler = e => {

        const id = e.target.value;
        const found = employeeItList.find(item => {
            return item.uuid == id
        });
        setTaskEmployeeInCharge(found);
    }

    // Сохранение новой или изменение имеющейся заявки
    const createOrUpdateTask = async (e) => {
        e.preventDefault();
        console.log("taskEmployeeInCharge in cout ", taskEmployeeInCharge)
        const newTask = {
            taskId: taskId,
            statusId: taskStatusId,
            statusName: taskStatusName,
            subtypeId: taskSubtypeId,
            subtypeName: taskSubtypeName,
            taskName: taskName,
            taskText: taskText ? taskText : "",
            employeeInCharge: taskEmployeeInCharge ? taskEmployeeInCharge.uuid : null
        };
        console.log("TASK: ", newTask)
        // Если заявка новая (значение -1), то она добавляется в БД при сохранении
        if (params.id === "-1") {
            try {
                const response: any = await createTask(newTask).unwrap();
                dispatch(setTask(response));
                const newTaskId = response.taskId;
                //newTaskId передавать для апдейта файлов, если есть
                handleFileUpload(newTaskId);
                navigate("/tasks/all");
            } catch (err: any) {
                console.error(err);
            }
        }
        // Если заявка пришла с ID, то будет изменена существующая заявка
        else {
            console.log("newTask before updateTask", newTask);
            try {
                const response: any = await updateTask({ task: newTask, taskId }).unwrap();
                dispatch(setTask(response));
                console.log("UPDATETASK RESPONSE: ", response);
                handleFileUpload(newTask.taskId);
                navigate("/tasks/all");

                // // Если есть файлы на удаление, то они будут удалены
                if (removeFiles.length != 0) {
                    removeFiles.map(async item => {
                        await deleteFile(item);
                    })
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    // Название в "шапке" в зависимости от того, новая заявка или имеющаяся
    const getTitle = () => {
        if (params.id === "-1") {
            return "Новая заявка";
        }
        else {
            return `Заявка № ${taskId}`;
        }
    }

    // Форматирование даты
    const getDate = (date) => {
        if (params.id !== "-1") {
            const createdAt = new Date(date);
            const createdDate = createdAt.toLocaleDateString("ru-RU");
            const createdTime = createdAt.toLocaleTimeString("ru-RU");
            return (
                `Создана: ${createdDate}, ${createdTime}`
            )
        }
    }

    // Форматирование создателя заявки
    const getCreator = (creator) => {
        if (params.id !== "-1") {
            return (
                `Автор: ${creator}`
            )
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

    // Обработчик отображения поля выбора ответственного
    const handleEmployeeInCharge = () => {
        // Изменять поле ответственного может только сотрудник с определёнными ролями
        var disabled = (currentRoles.find(r => {
            return r.roleId == 3
        })
            ? false
            : true
        )

        // Если заявка новая, то поле ответственного изменить нельзя, оно по умолчанию имеет значение "Не назначен"
        if (params.id === "-1") {
            return (
                <select className="form-select" disabled>
                    <option>Не назначен</option>
                </select>
            )
        }

        /* Если изменяется существующая заявка, то по умолчанию отображается её ответственный, его можно менять,
         выбрав в выпадающем меню нужный */
        else {
            return (
                <select className="form-select"
                    disabled={disabled}
                    onChange={changeEmployeeInChargeHandler}>
                    <option selected disabled>
                        {taskEmployeeInCharge
                            ? ([taskEmployeeInCharge].map((item) => {
                                return (
                                    <div key={item.uuid}> {item.lastName} {item.firstName} {item.patronymic}</div>
                                )
                            }))
                            : (<div>{"Не назначен"}</div>)}
                    </option>
                    {employeeItList.map((item) => {
                        return (
                            <option value={item.uuid} key={item.uuid}>{item.lastName} {item.firstName} {item.patronymic}</option>
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
                    {subtypes.map((item) => {
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
                    {subtypes.map((item) => {
                        return (
                            <option value={item.subtypeId} key={item.subtypeId}>{item.subtypeName}</option>
                        );
                    })}
                </select>
            )
        }
    }

    // Обработчик загрузки файлов 
    const handleFileUpload = async (taskId: string) => {
        if (selectedFiles && selectedFiles.length !== 0) {
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("files", selectedFiles[i]);
            }
            formData.append("taskId", taskId);
            const res = await axiosPrivate.post(FILEDATA_API_BASE_URL + "/uploadFile", formData);
            console.log("RESPONSE ON FILE", res);
        }
        else {
            console.log("NO FILES TO UPLOAD");
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
        else if (params.id === "-1" && taskText === '') {
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
                            onClick={createOrUpdateTask}>
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
                    <div className="d-flex flex-column fs-6">
                        <h1>{getTitle()}</h1>
                        <div className="d-flex flex-row">
                            {getDate(taskCreatedAt)}
                        </div>
                        <div className="d-flex flex-row">
                            {getCreator(taskCreatedBy)}
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row border">
                    <div className="d-flex flex-column p-1">
                        Статус
                        <div className="d-flex flex-row py-1">
                            {handleTaskStatus()}
                        </div>
                        Тип
                        <div className="d-flex flex-row py-1">
                            {handleTaskSubtype()}
                        </div>
                        Ответственный
                        <div className="d-flex flex-row py-1">
                            {handleEmployeeInCharge()}
                        </div>
                        Вложения
                        <FileUpload
                            files={files}
                            setFiles={setFiles}
                            selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}
                            removeFiles={removeFiles} setRemoveFiles={setRemoveFiles} />

                        <div className="d-flex flex-row py-1 fs-6 justify-content-end py-2">
                            {handleSubmitButton()}
                            <div className="d-flex flex-column flex-shrink-1 justify-content-end">
                                <button className='btn btn-danger'
                                    onClick={() => {
                                        navigate(-1);
                                        console.log(taskSubtypeId, taskSubtypeName);
                                    }}
                                    style={{ marginLeft: "10px" }}>Отменить</button>
                            </div>
                        </div>
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
                <div className="d-flex flex-row py-1">
                    {params.id !== "-1" ? (<TaskHistory />) : (<></>)}
                </div>

            </div>
        </div >
    );
}

export default CreateOrUpdateTaskComponent;


