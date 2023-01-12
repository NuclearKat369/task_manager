import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../features/store';
import { BsArrowDownUp } from 'react-icons/bs';
import ListedTasksComponent from './ListedTasksComponent';
import { getAllTasks, getIsSuccess, setAllTasks } from '../features/taskListNewSlice';
import { useGetAllTasksWithStatusIdQuery, useShowWithStatusesAndSubtypesQuery } from '../features/taskListApiSlice';
import { useParams } from 'react-router-dom';
import { TaskStatusType } from '../features/enums';
import { setAllTaskFiles } from '../features/newSlices/taskFileSlice';

function ListAllTasksComponent() {

    const params = useParams();

    const newTasks = useGetAllTasksWithStatusIdQuery({
        statusId: `${TaskStatusType[params.statusId.toUpperCase()]}`
    });

    const tasksFromReducer = useAppSelector(getAllTasks);
    const tasksSuccess = useAppSelector(getIsSuccess);

    const dispatch = useAppDispatch();

    const [order, setOrder] = useState("ASC");
    const [sorted, setSorted] = useState([]);
    const [sortBy, setSortBy] = useState("taskId");
    const [sortRequest, setSortRequest] = useState(false);

    console.log("tasksFromReducer: ", tasksFromReducer, tasksSuccess, params)

    useEffect(() => {
        console.log("ListAllTasksComponent RENDER")
        handleClick();
    });
    

    useEffect(() => {
        console.log("ListAllTasksComponent RENDER")
        console.log("setSorted(tasksFromReducer)", tasksFromReducer)
        handleClick();
    }, [params.statusId]);



    // useEffect(() => {
    //     console.log("ListAllTasksComponent PARAMS", params)
    //     handleClick();
    // }, [params.statusId]);

    // useEffect(() => {
    //     // dispatch(setAllTaskFiles([]));
    //     console.log("BEFORE HANDLECLICK ON LIST ALL TASKS")
    //     if (tasks.isSuccess) {
    //         // dispatch(setAllTasks({
    //         //     value: tasks.data,
    //         //     isError: tasks.isError,
    //         //     isFetching: tasks.isFetching,
    //         //     isLoading: tasks.isLoading,
    //         //     isSuccess: tasks.isSuccess,
    //         // }));
    //     }
    //     if (newTasks.isSuccess) {
    //         // dispatch(setAllTasks({
    //         //     value: newTasks.data,
    //         //     isError: newTasks.isError,
    //         //     isFetching: newTasks.isFetching,
    //         //     isLoading: newTasks.isLoading,
    //         //     isSuccess: newTasks.isSuccess,
    //         // }));
    //     }
    // }, [(tasks.isSuccess || newTasks.isSuccess) || dispatch]);

    const handleClick = async () => {
        console.log("HANDLECLICK ON LIST ALL TASKS", params.statusId)
        // setSorted(tasksFromReducer)
        // if (TaskStatusType[params.statusId.toUpperCase()] === TaskStatusType.ALL) {
        //     console.log("TaskStatusType[params.statusId.toUpperCase()] === TaskStatusType.ALL", TaskStatusType[params.statusId.toUpperCase()] === TaskStatusType.ALL)
        //     await tasks;
        //     if (tasks.isSuccess) {
        //         console.log("tasks.isSuccess", tasks.isSuccess)
        //         console.log("tasks", tasks.data)
        //         dispatch(setAllTasks({
        //             value: tasks.data,
        //             isError: tasks.isError,
        //             isFetching: tasks.isFetching,
        //             isLoading: tasks.isLoading,
        //             isSuccess: tasks.isSuccess,
        //         }));
        //         setSorted(tasks.data);
        //         console.log("tasks", tasks.data)
        //     }
        // } else {
            await newTasks;
            if (newTasks.isSuccess) {
                console.log("newTasks.isSuccess", newTasks.isSuccess)
                dispatch(setAllTasks({
                    value: newTasks.data,
                    isError: newTasks.isError,
                    isFetching: newTasks.isFetching,
                    isLoading: newTasks.isLoading,
                    isSuccess: newTasks.isSuccess,
                }));
                setSorted(newTasks.data);
                console.log("tasks", newTasks.data)
            }
        // }
    }

    const statusCheck = () => {
        // if (tasks.isSuccess || newTasks.isSuccess) {
        if (tasksSuccess) {
            return (
                <ListedTasksComponent
                    sorted={sorted} setSorted={setSorted}
                    order={order} setOrder={setOrder}
                    sortBy={sortBy}
                    sortRequest={sortRequest}
                    setSortRequest={setSortRequest}

                />
            )
        }
        else {
            return (
                <tr className="fs-3">
                    <td colSpan={5}>Нет данных для отображения</td>
                </tr>
            )
        }
    }

    return (
        <div className="App">
            <table className="table table-hover table-light" align="center">
                <thead>
                    <tr>
                        <th className="th-sm"
                            scope="col"
                            onClick={() => {
                                setSortBy("taskId");
                                setSortRequest(true);
                                console.log("sortBy: ", sortBy)
                            }}>Номер <BsArrowDownUp /></th>
                        <th className="th-sm" scope="col"
                            onClick={() => {
                                setSortBy("taskName");
                                setSortRequest(true);
                                console.log("sortBy: ", sortBy)
                            }}>Тема <BsArrowDownUp /></th>
                        <th className="th-sm" scope="col"
                            onClick={() => {
                                setSortBy("statusName");
                                setSortRequest(true);
                                console.log("sortBy: ", sortBy)
                            }}>Статус <BsArrowDownUp /></th>
                        <th className="th-sm" scope="col"
                            onClick={() => {
                                setSortBy("createdAt");
                                setSortRequest(true);
                                console.log("sortBy: ", sortBy);
                            }}>Дата создания<BsArrowDownUp /></th>
                        <th className="th-sm" scope="col"
                            onClick={() => {
                                setSortBy("inCharge");
                                setSortRequest(true);
                                console.log("sortBy: ", sortBy);
                            }}>Ответственный<BsArrowDownUp /></th>
                    </tr>
                </thead>
                <tbody>
                    {statusCheck()}
                </tbody>
            </table>

        </div>
    );
}

export default ListAllTasksComponent;