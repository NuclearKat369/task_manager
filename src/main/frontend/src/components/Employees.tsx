import { useEffect } from 'react'
import { useGetAllEmployeesQuery } from '../features/employeesApiSlice';
import { useAppDispatch, useAppSelector } from '../features/store';
import { selectAllEmployees, setAllEmployees } from '../features/employeesSlice';
import { useNavigate } from 'react-router-dom';
import { useGetAllDepartmentsQuery } from '../features/departmentApiSlice';
import { setDepartments } from '../features/departmentSlice';
import { useGetAllPositionsQuery } from '../features/positionApiSlice';
import { setPositions } from '../features/positionSlice';
import { useGetAllRolesQuery } from '../features/roleApiSlice';
import { setRoles } from '../features/roleSlice';


const Employees = () => {

  const employees = useGetAllEmployeesQuery();
  const departments = useGetAllDepartmentsQuery();
  const positions = useGetAllPositionsQuery();
  const roles = useGetAllRolesQuery();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
  })

  useEffect(() => {
    if (employees.isSuccess) {
      dispatch(setAllEmployees(employees.data));
    }
  }, [employees.isSuccess])

  useEffect(() => {
    if (departments.isSuccess) {
      dispatch(setDepartments({
        value: departments.data,
        isError: departments.isError,
        isFetching: departments.isFetching,
        isLoading: departments.isLoading,
        isSuccess: departments.isSuccess
      }));
    }
  }, [departments.isSuccess]);

  useEffect(() => {
    if (positions.isSuccess) {
      dispatch(setPositions({
        value: positions.data,
        isError: positions.isError,
        isFetching: positions.isFetching,
        isLoading: positions.isLoading,
        isSuccess: positions.isSuccess
      }));
    }
  }, [positions.isSuccess]);

  useEffect(() => {
    if (roles.isSuccess) {
      dispatch(setRoles({
        value: roles.data,
        isError: roles.isError,
        isFetching: roles.isFetching,
        isLoading: roles.isLoading,
        isSuccess: roles.isSuccess
      }));
    }
  }, [roles.isSuccess]);

  const allEmployees = useAppSelector(selectAllEmployees);

  // Переход в окно редактирования или добавления заявки
  const editEmployee = (employeeId) => {
    navigate(`/management/employee/${employeeId}`);
  }

  // Сортировка ролей по ID
  const sortRoles = (roles) => {
    let sortable = [];
    for (var role in roles) {
      sortable.push(roles[role]);
    }
    sortable.sort((a, b) => { return a.roleId - b.roleId });

    return (
      sortable.map(r => {
        return (<tr>{r.name}</tr>)
      })
    )
  }

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
                  <th className="th-sm" scope="col">Фамилия</th>
                  <th className="th-sm" scope="col">Имя</th>
                  <th className="th-sm" scope="col">Отчество</th>
                  <th className="th-sm" scope="col">Электронная почта</th>
                  <th className="th-sm" scope="col">Права</th>
                </tr>
              </thead>
              <tbody>
                {allEmployees.map((employee) => {
                  console.log("allEmployees.map((employee)", employee)
                  return (
                    <tr key={employee.uuid} onClick={() => {
                      editEmployee(employee.uuid)
                    }}>
                      <td>{employee.lastName}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.patronymic}</td>
                      <td>{employee.email}</td>
                      <td>{employee.roles.length > 1
                        ? <>{sortRoles(employee.roles)}</>
                        : <> {<tr>{employee.roles.map((role: any) => {
                          return (<td>{role.name}</td>)
                        })}
                        </tr>}</>}</td>
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

export default Employees;