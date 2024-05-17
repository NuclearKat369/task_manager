import { useEffect } from "react";
import { useAppSelector } from "../features/store";
import { selectTaskHistory } from "../features/taskHistorySlice";

const TaskHistory = () => {

    const taskHistory = useAppSelector(selectTaskHistory);

    useEffect(() => {

    }, []);

    // Форматирование даты
    const getDate = (date) => {
        const createdAt = new Date(date);
        const createdDate = createdAt.toLocaleDateString("ru-RU");
        const createdTime = createdAt.toLocaleTimeString("ru-RU");
        return (
            `${createdDate} ${createdTime}`
        )
    }

    console.log("taskHistory: ", taskHistory);

    let previousMessages = [taskHistory]
        ? (taskHistory.map((item) => {
            return (
                <tr className="border-top border-bottom">
                    <tr className="d-flex flex-row">
                        <td className="d-flex flex-column border-end p-1">{getDate(item.historyLastUpdated)}</td>
                        <td className="d-flex flex-column p-1">{item.historyModifiedByLastName} {item.historyModifiedByFirstName} {item.historyModifiedByPatronymic}</td>
                    </tr>
                    <tr className="d-flex flex-row py-2">
                        <pre className="history-text fs-6">{item.historyTaskText}</pre>
                    </tr>

                </tr>
            )
        }))
        : (<>Нет данных для отображения</>)

    return (
        <div>Ход решения
            <table className="table table-hover d-flex fs-6">
                <tbody>
                    {previousMessages}
                </tbody>
            </table>
        </div>
    )
}

export default TaskHistory;