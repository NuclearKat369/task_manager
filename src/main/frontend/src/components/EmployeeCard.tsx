import { useEffect, useState } from 'react';
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from '../features/employeesApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../features/store';
import { selectAllDepartments } from '../features/departmentSlice';
import { selectAllPositions } from '../features/positionSlice';
import { selectAllRoles } from '../features/roleSlice';

const EmployeeCard = () => {

    const params = useParams();

    const user = useGetEmployeeByIdQuery({ employeeId: params.employeeId }, { refetchOnMountOrArgChange: true });
    const [employee, setEmployee] = useState(null);
    const departments = useAppSelector(selectAllDepartments);
    const positions = useAppSelector(selectAllPositions);
    const roles = useAppSelector(selectAllRoles)
    const [updateEmployee] = useUpdateEmployeeMutation();
    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [role, setRole] = useState([]);
    const [department, setDepartment] = useState(null);
    const [position, setPosition] = useState(null);
    const [uuid, setUuid] = useState("");

    const [checkboxRoles, setCheckboxRoles] = useState([]);

    useEffect(() => {
        if (user.isSuccess) {
            setEmployee(user.data);
        }

    }, [user.isSuccess]);

    useEffect(() => {
        if (employee) {
            setEmail(employee.email);
            setLastName(employee.lastName);
            setFirstName(employee.firstName);
            setPatronymic(employee.patronymic);
            setRole(employee.roles);
            setDepartment(employee.department);
            setPosition(employee.position);
            setUuid(employee.uuid);
        }
    }, [employee]);

    useEffect(() => {

        setCheckboxRoles(roles && roles.map((value) => {
            return (
                ({
                    roleId: value.roleId,
                    name: value.name,
                    checked: (role.find(r => {
                        return r.roleId == value.roleId
                    })
                        ? true
                        : false)
                })
            )
        }))
    }, [role])


    // Изменение данных сотрудника
    const saveEmployee = async (e) => {
        e.preventDefault();
        console.log("UpdateEmployee in EmployeeCardComponent ", employee);
        const newEmployee = {
            uuid: uuid,
            email: email,
            lastName: lastName,
            firstName: firstName,
            patronymic: patronymic,
            // Фильтр по ролям в CheckBox, убирается поле "checked"
            roles: checkboxRoles.filter(checkboxRole => (checkboxRole.checked)).map(r => ({
                roleId: r.roleId,
                name: r.name
            })),
            department: department,
            position: position
        };

        console.log("newEmployee: ", newEmployee);

        const response: any = await updateEmployee({ employee: newEmployee, employeeId: uuid }).unwrap();
        console.log("saveEmployee RESPONSE: ", response);

        navigate("/management/all-employees");

    }


    // Обработчик изменения отдела в выпадающем меню
    const changeDepartmentHandler = e => {

        const id = e.target.value;
        const found = departments.find(item => {
            return item.departmentId == id
        });
        setDepartment({ departmentId: found.departmentId, departmentName: found.departmentName });
    }

    // Обработчик отображения поля отдела заявки
    const handleDepartment = () => {

        /* По умолчанию отображается отдел, в котором числится сотрудник, его можно менять,
         выбрав в выпадающем меню нужный */
        return (
            <select className="form-select"
                defaultValue={department ? department.departmentId : ""} onChange={changeDepartmentHandler}>
                <option value={department ? department.departmentId : ""} disabled>
                    {department ? department.departmentName : ""}
                </option>
                {departments.map((item) => {
                    return (
                        <option value={item.departmentId} key={item.departmentId}>{item.departmentName}</option>
                    );
                })}
            </select>
        )
    }

    // Обработчик изменения отдела в выпадающем меню
    const changePositionHandler = e => {

        const id = e.target.value;
        const found = positions.find(item => {
            return item.positionId == id
        });
        setPosition({ positionId: found.positionId, positionName: found.positionName });
    }

    // Обработчик отображения поля отдела заявки
    const handlePosition = () => {

        /* По умолчанию отображается отдел, в котором числится сотрудник, его можно менять,
         выбрав в выпадающем меню нужный */
        return (
            <select className="form-select"
                defaultValue={position ? position.positionId : ""} onChange={changePositionHandler}>
                <option value={position ? position.positionId : ""} disabled>
                    {position ? position.positionName : ""}
                </option>
                {positions.map((item) => {
                    return (
                        <option value={item.positionId} key={item.positionId}>{item.positionName}</option>
                    );
                })}
            </select>
        )
    }

    // Обработчки отображения ролей
    const handleRoles = () => {
        return (
            <div>
                {checkboxRoles.map((item) => (
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={item.roleId} id="flexCheckDefault"
                            checked={item.checked}
                            onChange={changeRolesHandler}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {item.name}
                        </label>
                    </div>
                ))}
            </div>
        )
    }


    // Обработчик измения поля "Email"
    const changeEmailHandler = e => {
        setEmail(e.target.value);
    }

    // Обработчик измения поля "Фамилия"
    const changeLastNameHandler = e => {
        setLastName(e.target.value);
    }

    // Обработчик измения поля "Имя"
    const changeFirstNameHandler = e => {
        setFirstName(e.target.value);
    }

    // Обработчик измения поля "Отчество"
    const changePatronymicHandler = e => {
        setPatronymic(e.target.value);
    }

    // Обработчик измения поля "Роли"
    const changeRolesHandler = e => {

        const id = e.target.value;
        var newRoles = checkboxRoles.map((checkboxRole) => {
            return (checkboxRole.roleId == id
                ? { ...checkboxRole, checked: !checkboxRole.checked }
                : checkboxRole)
        });
        setCheckboxRoles(newRoles);
    }

    const handleSubmitButton = () => {
        const warning = "Заполнены не все поля!";

        if (lastName === '') {
            return (
                <div className="d-flex flex-column flex-grow-1 justify-content-end">
                    <div className="d-flex flex-row text-danger">
                        {warning}
                    </div>
                    <div className="d-flex flex-row flex-shrink-1 justify-content-end">
                        <button className="btn btn-success" disabled>
                            Сохранить
                        </button>
                    </div>
                </div>
            );
        }
        else if (firstName === '') {
            return (
                <div className="d-flex flex-column flex-grow-1 justify-content-end">
                    <div className="d-flex flex-row text-danger">
                        {warning}
                    </div>
                    <div className="d-flex flex-row flex-shrink-1 justify-content-end">
                        <button className="btn btn-success" disabled>
                            Сохранить
                        </button>
                    </div>
                </div>
            );
        }
        else if (email === '') {
            return (
                <div className="d-flex flex-column flex-grow-1 justify-content-end">
                    <div className="d-flex flex-row text-danger">
                        {warning}
                    </div>
                    <div className="d-flex flex-row flex-shrink-1 justify-content-end">
                        <button className="btn btn-success" disabled>
                            Сохранить
                        </button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="d-flex flex-column flex-grow-1 justify-content-end">
                    <div className="d-flex flex-row"></div>
                    <div className="d-flex flex-row flex-shrink-1 justify-content-end">
                        <button className="btn btn-success"
                            onClick={saveEmployee}>
                            Сохранить
                        </button>
                    </div>
                </div>
            );
        }
    }



    let content = employee
        ? (
            <div className="p-3 fs-6">
                <div>
                    <label htmlFor="uuidInput" className="form-label">UUID</label>
                    <input
                        className="form-control"
                        type="uuid"
                        id="uuidInput"
                        size={20}
                        maxLength={20}
                        placeholder={uuid}
                        readOnly
                        value={uuid} />
                </div>
                <div>
                    <label htmlFor="emailInput" className="form-label">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        id="emailInput"
                        size={24}
                        maxLength={24}
                        placeholder={"Электронная почта"}
                        value={email}
                        onChange={changeEmailHandler}
                    />
                </div>
                <div>
                    <div className="d-flex flex-row py-3">
                        <div className="d-flex flex-column">
                            <label htmlFor="lastNameInput" className="form-label">Фамилия</label>
                            <input
                                className="form-control"
                                type="lastName"
                                id="lastNameInput"
                                placeholder={"Фамилия"}
                                value={lastName}
                                onChange={changeLastNameHandler}
                            />
                        </div>
                        <div className="d-flex flex-column px-3">
                            <label htmlFor="firstNameInput" className="form-label">Имя</label>
                            <input
                                className="form-control"
                                type="firstName"
                                id="firstNameInput"
                                placeholder={"Имя"}
                                value={firstName}
                                onChange={changeFirstNameHandler}
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <label htmlFor="patronymicInput" className="form-label">Отчество</label>
                            <input
                                className="form-control"
                                type="patronymic"
                                id="patronymicInput"
                                placeholder={"Отчество"}
                                value={patronymic}
                                onChange={changePatronymicHandler}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="departmentInput" className="form-label">Отдел</label>
                            <div className="d-flex flex-row py-1" id="departmentInput">
                                {handleDepartment()}
                            </div>
                        </div>
                        <div className="py-2">
                            <label htmlFor="positionInput" className="form-label">Должность</label>
                            <div className="d-flex flex-row py-1" id="departmentInput">
                                {handlePosition()}
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-1 py-3">
                        Права
                        {handleRoles()}
                    </div>
                </div>

                <div className="d-flex flex-row py-1 fs-6 justify-content-end py-2">
                    {handleSubmitButton()}
                    <div className="d-flex flex-column flex-shrink-1 justify-content-end">
                        <button className='btn btn-danger'
                            onClick={() => {
                                navigate(-1);
                            }}
                            style={{ marginLeft: "10px" }}>Отменить</button>
                    </div>
                </div>

            </div>
        )
        : (<>No data</>);


    return (
        <div className="fs-5">Редактирование учётной записи сотрудника
            {content}
        </div>
    )
}

export default EmployeeCard;