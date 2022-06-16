// import React, { Component, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import TaskService from '../services/TaskService';

// function CreateTaskComponent() {

//     const [taskName, setTaskName] = useState('');
//     const [taskText, setTaskText] = useState('');
//     const navigate = useNavigate();

    
//     const changeNameHandler = e => {
//         setTaskName(e.target.value);
//     }

//     const changeTextHandler = e => {
//         setTaskText(e.target.value);
//     }

//     const saveTask = (e) => {
//         e.preventDefault();
//         var Task = {
//             taskName: taskName,
//             taskText: taskText
//         }
//         TaskService.createTask(Task).then(res => {
//             navigate('/tasks');
//         });
//     }

//     return (
//         <div className="container">

//             <div className='row'>
//                 <div className='card col-md 6 offset-md-3 offset-md-3'>
//                     <h3 className='text-center'>Новая задача</h3>
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

//                             <button className='btn btn-success' onClick={saveTask}>Сохранить</button>
//                             <button className='btn btn-danger' onClick={() => navigate('/tasks')}>Отменить</button>

//                         </form>



//                     </div>
//                 </div>

//             </div>

//         </div>
//     );
// }

// export default CreateTaskComponent;
