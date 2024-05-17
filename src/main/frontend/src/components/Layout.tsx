import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../features/store';
import SideComponent from './SideComponent';
import { useAppSelector } from '../features/store';
import { useGetStatusesQuery } from '../features/taskStatusApiSlice';
import { selectCurrentFirstName, selectCurrentLastName, selectCurrentPatronymic, selectCurrentEmail, setCredentials } from '../features/auth/authSlice'
import { useGetSubtypesQuery } from '../features/taskSubtypeApiSlice';
import { setSubtypes } from '../features/taskSubtypeSlice';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import Footer from './Footer';
import { setAllTaskStatuses } from '../features/taskStatusSlice';

function Layout() {

    const [searchTaskId, setSearchTaskId] = useState("");
    const loggedIn = useAppSelector(selectCurrentEmail);
    const taskSubtypes = useGetSubtypesQuery();
    const taskStatuses = useGetStatusesQuery();
    const [logout] = useLogoutMutation();

    const currentUser = `${useAppSelector(selectCurrentLastName)} ${useAppSelector(selectCurrentFirstName)} ${useAppSelector(selectCurrentPatronymic)}`;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        handleClick();
    }, [])

    if (taskSubtypes.isSuccess) {
        dispatch(setSubtypes({
            value: taskSubtypes.data,
            isError: taskSubtypes.isError,
            isFetching: taskSubtypes.isFetching,
            isLoading: taskSubtypes.isLoading,
            isSuccess: taskSubtypes.isSuccess,
        }))
    }
    if (taskStatuses.isSuccess) {
        dispatch(setAllTaskStatuses({
            value: taskStatuses.data,
            isError: taskStatuses.isError,
            isFetching: taskStatuses.isFetching,
            isLoading: taskStatuses.isLoading,
            isSuccess: taskStatuses.isSuccess,
        }))
    }

    const handleClick = async () => {
        await taskSubtypes;
        await taskStatuses;
    }

    const signOut = async () => {
        const response: any = await logout({}).unwrap();
        if (response === 1) {
            dispatch(setCredentials({
                email: null,
                accessToken: null,
                lastName: null,
                firstName: null,
                patronymic: null,
                uuid: null,
                roles: null,
            }))
            navigate("/login");
        }
    }

    // Поиск задачи по номеру
    const searchTask = async (e) => {
        e.preventDefault();
        await taskStatuses;
        navigate(`/task/${searchTaskId}`);
    }

    // Обработка изменений в поле поиска
    const changeSearchTaskIdHandler = e => {
        setSearchTaskId(e.target.value);
    }

    // Показать "Инструкцию"
    const showInfo = () => {
        navigate(`/info`)
    }

    // Показать "Контакты"
    const showContacts = () => {
        navigate(`/contacts`)
    }

    return (
        <div className="d-flex flex-conatiner">
            <div className="d-flex flex-column flex-grow-1">
                <div className="d-flex flex-row flex-grow-1 px-1">
                    <nav
                        className="fixed-top navbar navbar-expand-lg nav-bg-theme flex-grow-1">
                        <div className="container-fluid">
                            <a className="navbar-brand" type="button" onClick={()=> navigate("/tasks/all")}>
                                Менеджер заявок
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            {loggedIn !== null ? (
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item nav-layout rounded">
                                            <a className="nav-link active" aria-current="page" href="">Расширенный поиск</a>
                                        </li>
                                        <li className="nav-item nav-layout rounded dropdown">
                                            <a className="nav-link active dropdown-toggle" href="" id="navbarDropdown"
                                                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Справочная информация
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a className="dropdown-item nav-layout rounded" onClick={() => showInfo()}>
                                                    Инструкция
                                                </a></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><a className="dropdown-item nav-layout rounded" onClick={() => showContacts()}>
                                                    Контакты
                                                </a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item nav-layout rounded" onClick={() => navigate(`/management`)}>
                                            <a className="nav-link active" role="button" aria-current="page">
                                                Администрирование
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                            </ul>
                                        </li>


                                    </ul>
                                    <div className="justify-content-end">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item nav-layout rounded" onClick={() => navigate(`/account`)}>
                                                <a className="nav-link active" role="button" aria-current="page">
                                                    {currentUser}
                                                </a>
                                            </li>
                                            <li className="nav-item nav-layout rounded" onClick={signOut}>
                                                <a className="nav-link active" role="button" aria-current="page">
                                                    Выйти
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            ) : (
                                <div className="justify-content-end">
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item nav-layout rounded" onClick={() => navigate(`/login`)}>
                                                <a className="nav-link active" role="button">
                                                    Войти
                                                </a>
                                            </li>
                                            <li className="nav-item nav-layout rounded" onClick={() => navigate(`/register`)}>
                                                <a className="nav-link active" role="button">
                                                    Зарегистрироваться
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            )}
                        </div>
                    </nav>
                </div>
                {loggedIn == null ? (
                    <div className="App d-flex flex-row justify-content-center">
                        <div className="col-md-4 p-2 justify-content-center">
                            <Outlet />
                        </div>
                    </div>

                ) : (
                    <div className="App d-flex flex-row justify-content-start">
                        <div className="d-flex flex-column flex-shrink-1 p-2">
                            <form className="d-flex" onSubmit={searchTask}>
                                <input
                                    className="form-control me-2" type="search" pattern="\d*"
                                    size={15}
                                    maxLength={10}
                                    onInvalid={e =>
                                        (e.target as HTMLInputElement).setCustomValidity("Пожалуйста, введите номер заявки.")}
                                    onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                                    placeholder="Номер заявки" aria-label="Search"
                                    value={searchTaskId} onChange={changeSearchTaskIdHandler} />
                                <button className="btn btn-layout" type="submit">Поиск</button>
                            </form>
                            <br />
                            <SideComponent />
                        </div>
                        <div className="d-flex flex-column flex-grow-1 p-2 justify-content-start">
                            <Outlet />
                        </div>
                    </div>
                )}
            </div >
            <Footer />
        </div>
    );
}

export default Layout;