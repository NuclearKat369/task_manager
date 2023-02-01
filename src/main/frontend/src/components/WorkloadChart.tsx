import { ResponsiveBar } from "@nivo/bar";
import { selectAllEmployees } from "../features/employeesSlice";
import { useAppSelector } from "../features/store";
import { selectAllEmployeesWorkload } from "../features/employeesWorkloadSlice";

const WorkloadChart = () => {

    const allEmployees = useAppSelector(selectAllEmployees);
    const allEmployeesWorkload = useAppSelector(selectAllEmployeesWorkload);
    console.log("allEmployees WorkloadChart: ", allEmployees);
    console.log("allEmployeesWorkload WorkloadChart: ", allEmployeesWorkload);

    const getTaskCount = (uuid, statusId) => {
        const foundEmployee = allEmployeesWorkload.find(item => { return item.employeeId == uuid });
        console.log("foundEmployee", foundEmployee);
        if (foundEmployee) {
            const found = foundEmployee.employeeStatusCount.find(item => { return item.taskStatus.statusId == statusId });
            console.log("foundEmployee", found);
            if (found) {
                return (found.taskCount);
            }
            else {
                return (0);
            }
        }
        else {
            return (0);
        }
    }

    const chartData = allEmployees.map((item) => {
        return {
            employee: `${item.lastName} ${item.firstName}`,
            "Новая": `${getTaskCount(item.uuid, 1)}`,
            newTaskColor: " #ff8566",
            "В работе": `${getTaskCount(item.uuid, 2)}`,
            inProgressColor: "#ffe6cc",
            "Решена": `${getTaskCount(item.uuid, 3)}`,
            doneColor: "#ccffcc",
        }
    });

    console.log("chartData: ", chartData);

    let content = chartData.length
        ? (<ResponsiveBar
            data={chartData}
            keys={[
                "Новая",
                "В работе",
                "Решена"
            ]}
            indexBy="employee"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'pastel1' }}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Сотрудник",
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Количество заявок',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
        />)
        : (<>Нет данных для отображения</>)

    return (
        <div style={{ height: 600 }}>{content}</div>
    )
}

export default WorkloadChart;