import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../features/store';
import { useGetTaskEmployeeInChargeQuery, useGetTaskQuery } from '../features/taskListApiSlice';
import { setTask } from '../features/taskSlice';
import CreateOrUpdateTaskComponent from './CreateOrUpdateTaskComponent';
import { setAllTaskFiles } from '../features/taskFileSlice';
import { useGetFilesQuery } from '../features/taskFileApiSlice';
import { useGetAllEmployeeWithRoleQuery } from '../features/employeesApiSlice';
import { setAllEmployees } from '../features/employeesSlice';
import { useGetTaskHistoryQuery } from '../features/taskHistoryApiSlice';
import { setTaskHistory } from '../features/taskHistorySlice';

function TaskCardComponent() {

    const params = useParams();
    const taskId = params.id;

    const task = useGetTaskQuery({ taskId: params.id }, { refetchOnMountOrArgChange: true });
    const taskFiles = useGetFilesQuery({ taskId: params.id }, { refetchOnMountOrArgChange: true });
    const employeeInCharge = useGetTaskEmployeeInChargeQuery({ taskId: params.id }, { refetchOnMountOrArgChange: true });
    const employeeItList = useGetAllEmployeeWithRoleQuery({ roleId: 3 }, { refetchOnMountOrArgChange: true });
    const taskHistory = useGetTaskHistoryQuery({ taskId: params.id }, { refetchOnMountOrArgChange: true });

    console.log("TaskCardComponent task", task, employeeInCharge);


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect[] TaskCardComponent");
    });

    useEffect(() => {

    }, [params.id]);

    const getTask = async () => {
        await task;
        await employeeInCharge;
        await employeeItList;
        await taskHistory;
    }

    const getTaskFiles = async () => {
        await taskFiles;
        console.log("AWAITING TASKFILES", taskFiles);

    }

    const statusCheck = () => {
        dispatch(setTaskHistory({
            value: [],
            isError: false,
            isFetching: false,
            isLoading: false,
            isSuccess: false,
        }));
        getTask();
        //Проверка, что статус запроса "isSuccess" возвращаемый объект не пустой
        if (task.isSuccess || taskId === "-1") {
            if (task.isSuccess && employeeInCharge.isSuccess) {
                console.log("if (task.isSuccess)", task);
                if (params.id !== "-1") {
                    getTaskFiles();
                    if (taskFiles.isSuccess) {
                        dispatch(setAllTaskFiles({ data: taskFiles.data, status: taskFiles.isSuccess }));
                        console.log("setAllTaskFiles", taskFiles);
                    }
                }
                dispatch(setTask({
                    value: { data: task.data, employeeInCharge: employeeInCharge.data },
                    isError: task.isError,
                    isFetching: task.isFetching,
                    isLoading: task.isLoading,
                    isSuccess: task.isSuccess,
                }))
                if (employeeItList.isSuccess) {
                    dispatch(setAllEmployees(employeeItList.data));
                }
                if (taskHistory.isSuccess) {
                    console.log("taskHistory in card ", taskHistory.data);
                    dispatch(setTaskHistory({
                        value: taskHistory.data,
                        isError: taskHistory.isError,
                        isFetching: taskHistory.isFetching,
                        isLoading: taskHistory.isLoading,
                        isSuccess: taskHistory.isSuccess,
                    }));
                }

            }
            return (
                <CreateOrUpdateTaskComponent />
            )
        }
        else if (task.isLoading || employeeItList.isLoading || taskHistory.isLoading) {
            <h1>Task is loading</h1>
        }
        else if (task.isError) {
            navigate("/not-found");
        }
    }

    return (
        <div>
            {statusCheck()}
        </div>
    );
}

export default TaskCardComponent;