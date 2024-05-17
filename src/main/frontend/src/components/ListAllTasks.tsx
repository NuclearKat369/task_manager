import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../features/store';
import { BsArrowDownUp } from 'react-icons/bs';
import ListedTasks from './ListedTasks';
import { selectIsSuccess, setAllTasks } from '../features/taskListSlice';
import { useGetAllTasksWithStatusIdQuery, } from '../features/taskListApiSlice';
import { useParams } from 'react-router-dom';
import { TaskStatusType } from '../features/enums';

function ListAllTasks() {

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

    useEffect(() => {
    }, [newTasks]);

    useEffect(() => {

    }, []);

    const handleClick = async () => {
        await newTasks;
        console.log(newTasks);
        console.log("STATUS!!!", newTasks.status);
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

    return (
        <>
            {
                newTasks.isFetching || newTasks.isLoading ? (
                    <div className="p-6 fs-3 text-center">
                        Загрузка
                    </div>
                ) :
                    newTasks.isError ? (
                        <div className="fs-3">
                           Нет данных для отображения
                        </div>
                    ) :


                        (<table className="table table-hover table-light border" align="center">
                            <thead>
                                <tr>
                                    <th className="th-sm" scope="col"
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
                                {
                                    newTasks.isFetching || newTasks.isLoading ? (
                                        <tr className="fs-3 border justify-content-center">
                                            <td colSpan={5}>Загрузка</td>
                                        </tr>
                                    ) :
                                        newTasks.isError ? (
                                            <tr className="fs-3">
                                                <td colSpan={1}>Нет данных для отображения</td>
                                            </tr>
                                        ) :
                                            (
                                                <ListedTasks
                                                    sorted={sorted} setSorted={setSorted}
                                                    order={order} setOrder={setOrder}
                                                    sortBy={sortBy}
                                                    sortRequest={sortRequest}
                                                    setSortRequest={setSortRequest}
                                                />
                                            )
                                }
                            </tbody >
                        </table >
                        )
            }
        </>
    );
}

export default ListAllTasks;