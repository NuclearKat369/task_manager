import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { StatusType } from '../features/enums';
import { useAppSelector } from '../features/store';
import { getTaskFiles } from '../features/taskFileSlice';
import { getErrors, getStatus, getTask } from '../features/taskSlice';

function TaskCardComponent() {

    const params = useParams();
    const taskId = params.id;
    const task = useAppSelector(getTask);
    const status = useAppSelector(getStatus);
    const error = useAppSelector(getErrors);
    const navigate = useNavigate();

    useEffect(() => {

    }, [params.id])

    const statusCheck = () => {
        //Проверка, что статус запроса "FILFILLED" возвращяемы объект не пустой
        if (status === StatusType.FULFILLED) {
            console.log("TRUE OR FALSE? ", Object.keys(task[0]).length !== 0 || taskId === "-1")
            if (Object.keys(task[0]).length !== 0 || taskId === "-1") {
                return (
                    <Outlet context={taskId} />
                )
            }
            else {
                navigate("/not-found");
            }
        }
    }

    return (
        <div>
            {statusCheck()}
        </div>
    );
}

export default TaskCardComponent;