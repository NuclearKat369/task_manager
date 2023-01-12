import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../features/store';

import SideComponent from './SideComponent';
import { useAppSelector } from '../features/store';
import { useGetStatusesQuery } from '../features/taskStatusApiSlice';
import { selectCurrentUser } from '../features/auth/authSlice'
import { useGetSubtypesQuery } from '../features/taskSubtypeApiSlice';
import { setSubtypes } from '../features/taskSubtypeSlice';

function Layout() {

    const [searchTaskId, setSearchTaskId] = useState("");
    const loggedIn = useAppSelector(selectCurrentUser);
    const taskSubtypes = useGetSubtypesQuery();
    const taskStatuses = useGetStatusesQuery();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const params = useParams();

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
        dispatch(setSubtypes({
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

    // ПОКА НЕ РЕАЛИЗОВАНО
    const signOut = async () => {
        navigate("/login");
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
                        className="navbar navbar-expand-lg navbar-light bg-light flex-grow-1">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/tasks/all">
                                Менеджер заявок
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {/* <li className="nav-item">
                                        <a className="nav-link active enable-button-pointers" aria-current="page"
                                            onClick={() => handleButtonClick(
                                                Object.keys(TaskStatusType)[Object.values(TaskStatusType).indexOf(TaskStatusType.ALL)].toLowerCase())
                                            }>
                                            Главная
                                        </a>
                                    </li> */}
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="">Поиск</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link active dropdown-toggle" href="" id="navbarDropdown"
                                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Учётная запись
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link active dropdown-toggle" href="" id="navbarDropdown"
                                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Справочная информация
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a className="dropdown-item" onClick={() => showInfo()}>
                                                Инструкция
                                            </a></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" onClick={() => showContacts()}>
                                                Контакты
                                            </a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item" onClick={() => navigate(`/management`)}>
                                        <a className="nav-link active" aria-current="page">
                                            Администрирование
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                        </ul>
                                    </li>
                                    <li className="nav-item" onClick={signOut}>
                                        <a className="nav-link active" aria-current="page">
                                            Выйти
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                        </ul>
                                    </li>
                                </ul>

                                <form className="d-flex" onSubmit={searchTask}>
                                    <input
                                        className="form-control me-2" type="search" pattern="\d*"
                                        onInvalid={e =>
                                            (e.target as HTMLInputElement).setCustomValidity("Пожалуйста, введите номер заявки.")}
                                        onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
                                        placeholder="Номер заявки" aria-label="Search"
                                        value={searchTaskId} onChange={changeSearchTaskIdHandler} />
                                    <button className="btn btn-layout" type="submit">Поиск</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
                {loggedIn == null ? (
                    <div className="d-flex flex-row justify-content-center">
                        <div className="d-flex flex-column p-2 justify-content-center">
                            <Outlet />
                        </div>
                    </div>

                ) : (
                    <div className="d-flex flex-row justify-content-start">

                        <div className="d-flex flex-column flex-shrink-1 p-2">
                            <SideComponent />
                        </div>

                        <div className="d-flex flex-column flex-grow-1 p-2 justify-content-start">
                            <Outlet />
                        </div>
                    </div>

                )}



            </div >
        </div>
    );
}

export default Layout;