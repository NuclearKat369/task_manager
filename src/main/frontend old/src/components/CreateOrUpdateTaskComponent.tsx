import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import StatusService from '../services/StatusService';
import SubtypeService from '../services/SubtypeService';
import TaskService from '../services/TaskService';

function CreateOrUpdateTaskComponent() {

    const navigate = useNavigate();
    const params = useParams();

    const [taskId, setTaskId] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskText, setTaskText] = useState('');

    const [taskStatusId, setTaskStatusId] = useState('');
    const [taskStatusName, setTaskStatusName] = useState('');

    const [taskSubtypeId, setTaskSubtypeId] = useState('');
    const [taskSubtypeName, setTaskSubtypeName] = useState('');

    const [statuses, setStatuses] = useState([]);
    const [subtypes, setSubtypes] = useState([]);

    useEffect(() => {
        handleClick();
    }, [])

    // Подгрузка данных при переходе на страницу
    async function handleClick() {
        if (params.id !== '-1') {
            const resultTask = await TaskService.getTaskById(params.id);

            setTaskId(params.id);
            setTaskName(resultTask.data.taskName);
            setTaskText(resultTask.data.taskText);
            setTaskStatusId(resultTask.data.statusId);
            setTaskStatusName(resultTask.data.statusName);
            setTaskSubtypeId(resultTask.data.subtypeId);
            setTaskSubtypeName(resultTask.data.subtypeName);

        }
        const resultStatus = await StatusService.getStatuses();
        setStatuses(resultStatus.data);

        const resultSubtype = await SubtypeService.getSubtypes();
        setSubtypes(resultSubtype.data);
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
                navigate('/tasks');
            });
        }
        // Если заявка пришла с ID, то будет изменена существующая заявка
        else {
            TaskService.updateTask(taskId, Task).then(res => {
                navigate('/tasks');
            });
        }
    }

    // Название в "шапке" в зависимости от того, новая заявка или имеющаяся
    const getTitle = () => {
        if (params.id === "-1") {
            return "Новая заявка";
        }
        else {
            return `Заявка ${taskId}`
        }
    }

    // Обработчик отображения поля статуса
    const handleTaskStatus = () => {

        // Если заявка новая, то поле статуса изменить нельзя, оно по умолчанию имеет значение "Новая"
        if (params.id === "-1") {
            return (

                <select className="custom-select w-100 custom-select-lg text-dark bg-grey col-form-label-lg" disabled>
                    <option>Новая</option>
                </select>
            )
        }

        /* Если изменяется существующая заявка, то по умолчанию отображается её статус, его можно менять,
         выбрав в выпадающем меню нужный */
        else {
            return (
                <select className="custom-select w-100 custom-select-lg text-dark bg-grey col-form-label-lg"
                    onChange={changeStatusHandler}>
                    <option>
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
                <select className="custom-select w-100 custom-select-lg text-dark bg-grey col-form-label-lg"
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
                <select className="custom-select custom-select-lg text-dark bg-grey col-form-label-lg"
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

        const warning = 'Заполнены не все поля!';

        if (taskSubtypeId === '') {
            return (
                <div className='container row'>
                    <div className='col-md-10 text-danger'>{warning}</div>
                    <div className='col-md-2'>
                        <button className='btn btn-success' disabled>Сохранить</button>
                    </div>
                </div>
            );
        }
        else if (taskName === '') {
            return (
                <div className='container row'>
                    <div className='col-md-10 text-danger'>{warning}</div>
                    <div className='col-md-2'>
                        <button className='btn btn-success' disabled>Сохранить</button>
                    </div>
                </div>
            );
        }
        else if (taskText === '') {
            return (
                <div className='container row'>
                    <div className='col-md-10 text-danger'>{warning}</div>
                    <div className='col-md-2'>
                        <button className='btn btn-success' disabled>Сохранить</button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className='container row'>
                    <div className='col-md-8'></div>
                    <div className='col-md-4'>
                        <button className='btn btn-success'
                            onClick={updateTask}>Сохранить</button>
                    </div>
                </div>
            );
        }
    }


    return (
        <div className="container">

            <div className='row'>
                <div className='card col-md 6 offset-md-3 offset-md-3'>
                    <h3 className='card-header text-center'>{getTitle()}</h3>
                    <div className='card-body'>
                        <form>
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='card-title col-md-4 text-light bg-dark'>
                                        {handleTaskStatus()}
                                    </div>
                                    <div className='card-title col-md-8 text-light bg-dark'>
                                        {handleTaskSubtype()}
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='card-title'>Тема</div>
                                <input type='text' placeholder='Введите тему' name='taskName' className='form-control'
                                    value={taskName} onChange={changeNameHandler} />
                            </div>
                            <div className='form-group'>
                                <div className='card-title'>Описание</div>
                                <textarea placeholder='Опишите суть вопроса' name='taskText' className='form-control mh-100'
                                    value={taskText} onChange={changeTextHandler}
                                    style={{ height: '200px', resize: 'none' }} />
                            </div>
                            <div className='form-group'>
                                <div className='card-footer form-control d-flex justify-content-center'>
                                    <div className='row d-flex justify-content-center'>
                                        <div className='col-md-8 d-flex justify-content-right'>
                                            {handleSubmitButton()}
                                        </div>
                                        <div className='col-md-3 d-flex justify-content-left' style={{ marginLeft: '5px' }}>
                                            <button className='btn btn-danger'
                                                onClick={() => {
                                                    navigate('/tasks/all');
                                                    console.log(taskSubtypeId, taskSubtypeName)
                                                }}
                                                style={{ marginLeft: "10px" }}>Отменить</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>


                    </div>
                </div>

            </div >

        </div >
    );
}

export default CreateOrUpdateTaskComponent;


