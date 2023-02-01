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
                <div>
                    <div className="d-flex flex-row border-top border-bottom">
                        <div className="d-flex flex-column border-end p-1">{getDate(item.historyLastUpdated)}</div>
                        <div className="d-flex flex-column p-1">{item.historyModifiedByLastName} {item.historyModifiedByFirstName} {item.historyModifiedByPatronymic}</div>
                    </div>
                    <pre className="d-flex flex-row py-2 history-text fs-6">{item.historyTaskText}</pre>
                </div>

            )
        }))
        : (<>Нет данных для отображения</>)

    return (
        <div>Ход решения
            <div className="d-flex flex-column fs-6">{previousMessages}</div>
        </div>
    )
}

export default TaskHistory;