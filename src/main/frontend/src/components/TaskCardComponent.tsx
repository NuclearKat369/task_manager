import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../features/store';
import { useGetTaskQuery } from '../features/taskListApiSlice';
import { setTask } from '../features/taskSlice';
import CreateOrUpdateTaskComponent from './CreateOrUpdateTaskComponent';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { setAllTaskFiles } from '../features/newSlices/taskFileSlice';

const FILEDATA_API_BASE_URL = "http://localhost:8080/files";

function TaskCardComponent() {
    const axiosPrivate = useAxiosPrivate();
    const params = useParams();
    const taskId = params.id;

    const task = useGetTaskQuery({ taskId: params.id });

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        console.log("useEffect[] TaskCardComponent")
    })

    useEffect(() => {
        dispatch(setAllTaskFiles([]));
        if (params.id !== "-1") {
            axiosPrivate.get(FILEDATA_API_BASE_URL + "/task/" + taskId).then(res => {
                if (res.data?.length) {
                    dispatch(setAllTaskFiles({ data: res.data, status: res.status }));
                }
                console.log("setAllTaskFiles", res);
            })
        }
    }, [dispatch])


    const getTask = async () => {
        await task;
    }

    const statusCheck = () => {
        getTask();
        //Проверка, что статус запроса "isSuccess" возвращаемый объект не пустой
        if (task.isSuccess || taskId === "-1") {
            if (task.isSuccess) {
                console.log("if (task.isSuccess)")
                dispatch(setTask({
                    value: task.data,
                    isError: task.isError,
                    isFetching: task.isFetching,
                    isLoading: task.isLoading,
                    isSuccess: task.isSuccess,
                }))
            }
            return (
                <CreateOrUpdateTaskComponent />
            )
        }
        else if (task.isLoading) {
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