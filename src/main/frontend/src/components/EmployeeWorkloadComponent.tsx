import { useEffect } from 'react';
import { useGetAllEmployeeWithRoleQuery, useGetAllEmployeesWorkloadQuery } from '../features/employeesApiSlice';
import WorkloadChart from './WorkloadChart';
import EmployeeWorkLoadTable from './EmployeeWorkloadTable';
import { useAppDispatch } from '../features/store';
import { setAllEmployees } from '../features/employeesSlice';
import { setAllEmployeesWorkload } from '../features/employeesWorkloadSlice';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { TASK_API_BASE_URL } from '../features/globalConst';

const EmployeeWorkloadComponent = () => {

    const employees = useGetAllEmployeeWithRoleQuery({ roleId: 3 }, { refetchOnMountOrArgChange: true });
    const employeesWorkload = useGetAllEmployeesWorkloadQuery();

    const axiosPrivate = useAxiosPrivate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        getEmployees();
    });

    useEffect(() => {
        if (employees.isSuccess) {
            dispatch(setAllEmployees(employees.data));
        }
    }, [employees.isSuccess]);

    useEffect(() => {
        if (employeesWorkload.isSuccess) {
            dispatch(setAllEmployeesWorkload(employeesWorkload.data));
        }
    }, [employeesWorkload.isSuccess]);

    const getEmployees = async () => {
        await employees;
        await employeesWorkload;
    } 

     // Скачивание файла
     const downloadFile = () => {
        axiosPrivate.get(TASK_API_BASE_URL + "/get-excel-file", { responseType: "blob" }).then((res) => {
            console.log(res);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            let anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "Загруженность сотрудников.xlsx";
            document.body.append(anchor);
            anchor.setAttribute("style", "display: none;");
            anchor.click();
            anchor.remove();
        });

    }


    let content = employees.isSuccess && employeesWorkload.isSuccess
        ? <div>
            <button className="btn btn-layout py-2" onClick={downloadFile}>Выгрузить в Excel</button>
            <ul className="nav nav-tabs py-2" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active"
                        id="employees-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#employees"
                        type="button"
                        role="tab"
                        aria-controls="employees"
                        aria-selected="true">
                        Таблица
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false">
                        График
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active"
                    id="employees"
                    role="tabpanel"
                    aria-labelledby="employees-tab">
                    <EmployeeWorkLoadTable />

                </div>
                <div className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab">
                    <WorkloadChart />
                </div>
            </div>
        </div>
        : <div>
            Нет данных для отображения
        </div>

    return (
        <div>{content}</div>
    )
}

export default EmployeeWorkloadComponent