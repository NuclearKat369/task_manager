import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../features/store';
import { BsArrowDownUp } from 'react-icons/bs';
import ListedTasksComponent from './ListedTasksComponent';
import { selectIsSuccess, setAllTasks } from '../features/taskListNewSlice';
import { useGetAllTasksWithStatusIdQuery, } from '../features/taskListApiSlice';
import { useParams } from 'react-router-dom';
import { TaskStatusType } from '../features/enums';

function ListAllTasksComponent() {

    const params = useParams();

    const newTasks = useGetAllTasksWithStatusIdQuery({
        statusId: params.statusId === "creator"
            ? "creator"
            : params.statusId === "in-charge"
                ? "in-charge"
                : `${TaskStatusType[params.statusId.toUpperCase()]}`,
    }, { refetchOnMountOrArgChange: true });

    const tasksSuccess = useAppSelector(selectIsSuccess);

    const dispatch = useAppDispatch();

    const [order, setOrder] = useState("ASC");
    const [sorted, setSorted] = useState([]);
    const [sortBy, setSortBy] = useState("taskId");
    const [sortRequest, setSortRequest] = useState(false);

    useEffect(() => {
        console.log("ListAllTasksComponent RENDER");
        handleClick();
    }, [params.statusId]);

    const handleClick = async () => {
        await newTasks;
        if (newTasks.isSuccess) {
            dispatch(setAllTasks({
                value: newTasks.data,
                isError: newTasks.isError,
                isFetching: newTasks.isFetching,
                isLoading: newTasks.isLoading,
                isSuccess: newTasks.isSuccess,
            }));
            setSorted(newTasks.data);
            console.log("tasks", newTasks.data);
        }
    }

    const statusCheck = () => {
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
        <table className="table table-hover table-light" align="center">
            <thead>
                <tr>
                    <th className="th-sm"
                        scope="col"
                        onClick={() => {
                            setSortBy("taskId");
                            setSortRequest(true);
                            console.log("sortBy: ", sortBy);
                        }}>Номер <BsArrowDownUp role="button" /></th>
                    <th className="th-sm" scope="col"
                        onClick={() => {
                            setSortBy("taskName");
                            setSortRequest(true);
                            console.log("sortBy: ", sortBy);
                        }}>Тема <BsArrowDownUp role="button" /></th>
                    <th className="th-sm" scope="col"
                        onClick={() => {
                            setSortBy("status");
                            setSortRequest(true);
                            console.log("sortBy: ", sortBy);
                        }}>Статус <BsArrowDownUp role="button" /></th>
                    {/* Удаление заявки */}
                    {/* <th className="th-sm" scope="col">Удалить</th> */}
                    <th className="th-sm" scope="col"
                        onClick={() => {
                            setSortBy("createdAt");
                            setSortRequest(true);
                            console.log("sortBy: ", sortBy);
                        }}>Дата создания<BsArrowDownUp role="button" /></th>
                    <th className="th-sm" scope="col"
                        onClick={() => {
                            setSortBy("employeeInCharge");
                            setSortRequest(true);
                            console.log("sortBy: ", sortBy);
                        }}>Ответственный<BsArrowDownUp role="button" /></th>
                </tr>
            </thead>
            <tbody>
                {statusCheck()}
            </tbody>
        </table>
    );
}

export default ListAllTasksComponent;