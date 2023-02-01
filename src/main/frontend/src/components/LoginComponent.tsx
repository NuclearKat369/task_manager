import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { setCredentials } from '../features/auth/authSlice';
import { useAppDispatch } from '../features/store';
import { useLoginMutation } from '../features/auth/authApiSlice';

const LoginComponent = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef(null);
    const errRef = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    // Обработкик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response: any = await login({ email, password }).unwrap();
            console.log("response in LOGIN: ", response);
            dispatch(setCredentials({
                accessToken: response.accessToken,
                email,
                lastName: response.lastName,
                firstName: response.firstName,
                patronymic: response.patronymic,
                uuid: response.employeeId,
                roles: response.roles,
            }))
            setEmail("");
            setPassword("");
            navigate(from, { replace: true });
        } catch (err: any) {
            console.error(err);
            if (!err?.originalStatus) {
                setErrMsg("Произошла ошибка");
            }
            else if (err.originalStatus === 400) {
                setErrMsg("Не указана электронная почта или пароль");
            }
            else if (err.originalStatus === 401) {
                setErrMsg("Нет доступа");
            }
            else {
                setErrMsg("Авторизация не удалась");
            }
            errRef.current.focus();
        }
    }

    const content = isLoading ? <h1>Loading...</h1> : (
        <div>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className="bg-theme rounded-3 text-center p-2">Вход в систему</h1>
            <form className="p-2 fs-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">Почта:</label>
                    <input className="form-control fs-6"
                        type="text"
                        id="email"
                        size={24}
                        maxLength={24}
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Пароль:</label>
                    <input className="form-control fs-6"
                        type="password"
                        id="password"
                        size={24}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>

                <button className="btn btn-layout fs-5" disabled={(!email || !password) ? true : false}>Войти</button>

            </form>
            <div className="pt-3 fs-6">
                <p>
                    Нет учётной записи?<br />
                    <span className="line">
                        <Link to="/register">
                            Зарегистрироваться
                        </Link>
                    </span>
                </p>
            </div>
        </div>
    );

    return (
        <div className="border rounded-3 p-2">{content}</div>

    )
}

export default LoginComponent;