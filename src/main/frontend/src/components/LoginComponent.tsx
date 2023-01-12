import { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { setCredentials } from '../features/auth/authSlice';
import { useAppDispatch } from '../features/store';
import { useLoginMutation } from '../features/auth/authApiSlice';

const LoginComponent = () => {

    // const { setAuth }: any = useAuth();

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
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg("");
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        try {
            const response: any = await login({ email, password }).unwrap();
            console.log("response in LOGIN: ", response);
            dispatch(setCredentials({ accessToken: [response.accessToken], email }))
            setEmail("");
            setPassword("");
            navigate(from, { replace: true });
        } catch (err: any) {
            console.error(err);
            if (!err?.originalStatus) {
                setErrMsg("Нет ответа от сервера");
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
            <h1>Войти</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Почта:</label>
                <br />
                <input
                    type="text"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <br />

                <label htmlFor="password">Пароль:</label>
                <br />
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <br />
                <button>Войти</button>
                <p>
                    Нет учётной записи?<br />
                    <span className="line">
                        <Link to="/register">
                            Зарегистрироваться
                        </Link>
                    </span>
                </p>
            </form>
        </div>
    );

    return (
        <div>{content}</div>

    )
}

export default LoginComponent