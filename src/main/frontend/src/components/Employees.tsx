import { useEffect } from 'react'

import { useGetAllEmployeesQuery } from '../features/employeesApiSlice';
import { useAppDispatch, useAppSelector } from '../features/store';
import { getAllEmployees, setAllEmployees } from '../features/employeesSlice';


const Employees = () => {

  // const [employees, setEmployees] = useState<any>();

  const employees = useGetAllEmployeesQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("USE EFFECT #1")
  }, [])

  useEffect(() => {
    console.log("USE EFFECT #2")
    if (employees.isSuccess) {
      dispatch(setAllEmployees(employees.data))
    }
  }, [employees.isSuccess])

  const allEmployees = useAppSelector(getAllEmployees);


  let content;
  if (employees.isLoading) {
    content = <p>Loading...</p>
  } else if (employees.isSuccess) {
    content = (
      <article>
        <h2>Список сотрудников</h2>
        {employees?.data?.length
          ? (
            <table className="table table-hover table-light" align="center">
              <thead>
                <tr>
                  <th className="th-sm" scope="col">UUID</th>
                  <th className="th-sm" scope="col">Фамилия</th>
                  <th className="th-sm" scope="col">Имя</th>
                  <th className="th-sm" scope="col">Отчество</th>
                  <th className="th-sm" scope="col">Электронная почта</th>
                  <th className="th-sm" scope="col">Права</th>
                </tr>
              </thead>
              <tbody>
                {allEmployees.map((employee) => {
                  return (
                    <tr key={employee.uuid}>
                      <td>{employee.uuid}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.patronymic}</td>
                      <td>{employee.email}</td>
                      <td>{employee.roles.map((role: any) => {
                        return (<td>{role.id}</td>)
                      })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

          ) : <p>Нет пользователей для отображения</p>
        }
      </article>)
  } else if (employees.isError) {
    content = <p>{JSON.stringify(employees.error)}</p>
  }


  return content;
}

export default Employees