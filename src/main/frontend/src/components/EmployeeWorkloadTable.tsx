import { useEffect } from 'react';
import { useAppSelector } from '../features/store';
import { selectAllEmployees } from '../features/employeesSlice';
import { selectAllEmployeesWorkload } from '../features/employeesWorkloadSlice';


const EmployeeWorkLoadTable = () => {

  useEffect(() => {
  }, [])

  const allEmployees = useAppSelector(selectAllEmployees);
  const allEmployeesWorkload = useAppSelector(selectAllEmployeesWorkload);

  const getTaskCount = (uuid, statusId) => {
    const foundEmployee = allEmployeesWorkload.find(item => { return item.employeeId == uuid });
    if (foundEmployee) {
      const found = foundEmployee.employeeStatusCount.find(item => { return item.taskStatus.statusId == statusId });
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

  let content;
  if (!allEmployeesWorkload) {
    content = <p>Loading...</p>
  } else if (allEmployeesWorkload) {
    content = (
      <article>
        <h2>Список сотрудников</h2>
        {allEmployeesWorkload.length
          ? (
            <table className="table table-hover table-light" align="center">
              <thead>
                <tr>
                  <th className="th-sm" scope="col">Фамилия</th>
                  <th className="th-sm" scope="col">Имя</th>
                  <th className="th-sm" scope="col">Отчество</th>
                  <th className="th-sm text-center" scope="col">Новые</th>
                  <th className="th-sm text-center" scope="col">В работе</th>
                  <th className="th-sm text-center" scope="col">Решённые</th>
                  <th className="th-sm text-center" scope="col">Завершённые</th>
                </tr>
              </thead>
              <tbody>
                {allEmployees.map((employee) => {
                  return (
                    <tr key={employee.uuid}>
                      <td>{employee.lastName}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.patronymic}</td>
                      <td className="text-center">{getTaskCount(employee.uuid, 1)}</td>
                      <td className="text-center">{getTaskCount(employee.uuid, 2)}</td>
                      <td className="text-center">{getTaskCount(employee.uuid, 3)}</td>
                      <td className="text-center">{getTaskCount(employee.uuid, 4)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

          ) : <p>Нет пользователей для отображения</p>
        }
      </article>)
  }
  else { content = <p>{allEmployeesWorkload.error}</p> }



  return content;
}

export default EmployeeWorkLoadTable;