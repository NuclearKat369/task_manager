// import React, { Component, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import TaskService from '../services/TaskService';

// function UpdateTaskComponent() {

//     const navigate = useNavigate();
//     const params = useParams();

//     const [taskId, setTaskId] = useState('');
//     const [taskName, setTaskName] = useState('');
//     const [taskText, setTaskText] = useState('');


//     useEffect(() => {
//         handleClick();
//     }, [])

//     async function handleClick() {
//         const result = await TaskService.getTaskById(params.id);
//         setTaskId(params.id);
//         setTaskName(result.data.taskName);
//         setTaskText(result.data.taskText);
//     }

//     const changeNameHandler = e => {
//         setTaskName(e.target.value);
//     }

//     const changeTextHandler = e => {
//         setTaskText(e.target.value);
//     }

//     const updateTask = (e) => {
//         e.preventDefault();
//         var Task = {
//             taskName: taskName,
//             taskText: taskText
//         }
//         TaskService.updateTask(taskId, Task).then(res => {
//             navigate('/tasks');
//         });
//     }

//     return (
//         <div className="container">

//             <div className='row'>
//                 <div className='card col-md 6 offset-md-3 offset-md-3'>
//                     <h3 className='text-center'>Задача {params.id}</h3>
//                     <div className='card-body'>

//                         <form>

//                             <div className='form-group'>
//                                 <label>Тема</label>
//                                 <input type='text' placeholder='Введите тему' name='taskName' className='formControl'
//                                     value={taskName} onChange={changeNameHandler} />
//                             </div>

//                             <div className='form-group'>
//                                 <label>Описание</label>
//                                 <input type='text' placeholder='Опишите суть вопроса' name='taskText' className='formControl'
//                                     value={taskText} onChange={changeTextHandler} />
//                             </div>


//                             <button className='btn btn-success' onClick={updateTask}>Сохранить</button>
//                             <button className='btn btn-danger' onClick={() => navigate('/tasks')}>Отменить</button>

//                         </form>



//                     </div>
//                 </div>

//             </div>

//         </div>
//     );
// }

// export default UpdateTaskComponent;


