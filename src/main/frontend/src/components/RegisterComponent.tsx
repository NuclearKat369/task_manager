import { useRef, useState, useEffect } from 'react'
import { BsFillCheckCircleFill, BsFillXCircleFill, BsInfoSquareFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../features/store';
// import { registerUser } from '../features/authSlice';
import { StatusType } from '../features/enums';
import { Link } from 'react-router-dom';

// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[а-яА-Я]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    const userRef = useRef(null);
    const errRef = useRef(null);
    // const dispatch = useAppDispatch();
    const auth = useAppSelector((state: any) => state.auth);
    console.log(auth);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [patronymic, setPatronymic] = useState("");
    const [validPatronymic, setValidPatronymic] = useState(false);
    const [patronymicFocus, setPatronymicFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName));
    }, [firstName]);

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
    }, [lastName]);

    useEffect(() => {
        setValidPatronymic(NAME_REGEX.test(patronymic));
    }, [patronymic]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [email, firstName, lastName, patronymic, password, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const vEmail = EMAIL_REGEX.test(email);
        const vFirstName = NAME_REGEX.test(firstName);
        const vLastName = NAME_REGEX.test(lastName);
        const vPatronymic = NAME_REGEX.test(patronymic);
        const vPwd = PWD_REGEX.test(password);
        if (!vEmail || !vFirstName || !vLastName || !vPatronymic || !vPwd) {
            setErrMsg("Введены некорректные данные");
            return;
        }
        console.log(email, firstName, lastName, patronymic, password);
    }

    return (
        <> {auth.registerStatus === StatusType.FULFILLED ? (
            <h1>Вы успешно зарегистрировались.<br />
                Письмо с подтверждением регистрации было отправлено на указанную при регистрации почту.</h1>
        ) : (
            <div>
                <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Регистрация</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        Email:
                        <span className={validEmail ? "valid" : "hide"}>
                            <BsFillCheckCircleFill />
                        </span>
                        <span className={validEmail || !email ? "hide" : "invalid"}>
                            <BsFillXCircleFill />
                        </span>
                    </label>
                    <br />
                    <input
                        type="text"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        <BsInfoSquareFill />
                        Введите адрес электронной почты.<br />
                        От 4 до 24 символов.<br />
                        Буквы, цифры, _ и - допустимы.
                    </p>
                    <br />

                    <label htmlFor="firstName">
                        Имя:
                        <span className={validFirstName ? "valid" : "hide"}>
                            <BsFillCheckCircleFill />
                        </span>
                        <span className={validFirstName || !firstName ? "hide" : "invalid"}>
                            <BsFillXCircleFill />
                        </span>
                    </label>
                    <br />
                    <input
                        type="text"
                        id="firstName"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => { setFirstName(e.target.value) }}
                        required
                        aria-invalid={validFirstName ? "false" : "true"}
                        aria-describedby="fnnote"
                        onFocus={() => setFirstNameFocus(true)}
                        onBlur={() => setFirstNameFocus(false)}
                    />
                    <p id="fnnote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                        <BsInfoSquareFill />
                        До 24 символов.<br />
                        Только буквы.
                    </p>
                    <br />

                    <label htmlFor="patronymic">
                        Отчество:
                        <span className={validPatronymic ? "valid" : "hide"}>
                            <BsFillCheckCircleFill />
                        </span>
                        <span className={validPatronymic || !patronymic ? "hide" : "invalid"}>
                            <BsFillXCircleFill />
                        </span>
                    </label>
                    <br />
                    <input
                        type="text"
                        id="patronymic"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => { setPatronymic(e.target.value) }}
                        required
                        aria-invalid={validPatronymic ? "false" : "true"}
                        aria-describedby="pnote"
                        onFocus={() => setPatronymicFocus(true)}
                        onBlur={() => setPatronymicFocus(false)}
                    />
                    <p id="pnote" className={patronymicFocus && patronymic && !validPatronymic ? "instructions" : "offscreen"}>
                        <BsInfoSquareFill />
                        До 24 символов.<br />
                        Только буквы.
                    </p>
                    <br />

                    <label htmlFor="lastName">
                        Фамилия:
                        <span className={validLastName ? "valid" : "hide"}>
                            <BsFillCheckCircleFill />
                        </span>
                        <span className={validLastName || !lastName ? "hide" : "invalid"}>
                            <BsFillXCircleFill />
                        </span>
                    </label>
                    <br />
                    <input
                        type="text"
                        id="lastName"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => { setLastName(e.target.value) }}
                        required
                        aria-invalid={validLastName ? "false" : "true"}
                        aria-describedby="lnnote"
                        onFocus={() => setLastNameFocus(true)}
                        onBlur={() => setLastNameFocus(false)}
                    />
                    <p id="lnnote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                        <BsInfoSquareFill />
                        До 24 символов.<br />
                        Только буквы.
                    </p>
                    <br />

                    <label htmlFor="password">
                        Пароль:
                        <span className={validPwd ? "valid" : "hide"}>
                            <BsFillCheckCircleFill />
                        </span>
                        <span className={validPwd || !password ? "hide" : "invalid"}>
                            <BsFillXCircleFill />
                        </span>
                    </label>
                    <br />
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <BsInfoSquareFill />
                        От 8 до 24 символов.<br />
                        Должен содержать заглавные и строчные буквы, цифры, специальные символы.<br />
                        Допустимые символы: <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span>
                        <span aria-label="percent">%</span>
                    </p>
                    <br />

                    <label htmlFor='password'>
                        Подтвердить пароль:
                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                            <BsFillCheckCircleFill />
                        </span>
                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                            <BsFillXCircleFill />
                        </span>
                    </label>
                    <br />
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => { setMatchPwd(e.target.value) }}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <BsInfoSquareFill />
                        Поля должны совпадать
                    </p>
                    <br />

                    <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>
                        Зарегистрироваться</button>
                </form>
                <p>Уже зарегистрированы?<br />
                    <span className="line">
                        <Link to="/login">
                            Войти
                        </Link>
                    </span>

                </p>

            </div>
        )}</>



    )
}

export default Register