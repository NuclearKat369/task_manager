import { useEffect, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom';
import { StatusType } from '../features/enums';
import { useAppSelector } from '../features/store';
import { getAllTasks, getStatus, getTasksErrors } from '../features/taskListSlice';

function ListAllTasksComponent() {

    const tasks = useAppSelector(getAllTasks);
    const status = useAppSelector(getStatus);
    const error = useAppSelector(getTasksErrors);

    const statusCheck = () => {
        if (status === StatusType.FULFILLED) {
            return (
                <Outlet />
            )
        }
        else {
            return (
                <div className="tasks-error"><h3>{tasks.Error}</h3></div>
            )
        }
    }

    useEffect(() => {
    }, []);

    return (
        <div className="App">
            {statusCheck()}
        </div>
    );
}

export default ListAllTasksComponent;