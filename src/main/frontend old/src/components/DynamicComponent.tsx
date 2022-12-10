import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { RootState } from '../app/store';

interface TaskListTypes{
    name: string
}

function DynamicComponent() {
    
    const params = useParams();
    const [taskStatusId, setTaskStatusId] = useState(params.statusId);

    const allTasks = useSelector((state: RootState) => state.taskList.value)

    useEffect(() => {
        console.log("taskStatusID = ");
    console.log(taskStatusId);
    }, [taskStatusId])

    // console.log("taskStatusID = ");
    // console.log(taskStatusId);

    return (
        <div>

            
            <Outlet context={[taskStatusId]}/>
        </div>
    );
}

export default DynamicComponent;
