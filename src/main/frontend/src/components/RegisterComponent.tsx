import { useRef, useState, useEffect } from 'react';
import { BsFillCheckCircleFill, BsFillXCircleFill, BsInfoSquareFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { EMAIL_REGEX, EMAIL_TIP, NAME_REGEX, NAME_TIP, PWD_REGEX, PWD_TIP } from '../features/globalConst';
import { useRegisterMutation } from '../features/auth/authApiSlice';

const RegisterComponent = () => {

    const userRef = useRef(null);
    const errRef = useRef(null);

    const [registerStatus, setRegisterStatus] = useState(0);

    const [register] = useRegisterMutation();

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
        const response = await register({ email, firstName, lastName, patronymic, password }).unwrap();

        console.log("response in register:", response);

        setRegisterStatus(response);
        if (response === 1) {
            setEmail("");
            setValidEmail(false);
            setEmailFocus(false);
            setFirstName("");
            setValidFirstName(false);
            setFirstNameFocus(false);
            setLastName("");
            setValidLastName(false);
            setLastNameFocus(false);
            setPatronymic("");
            setValidPatronymic(false);
            setPatronymicFocus(false);
            setPassword("");
            setValidPwd(false);
            setPwdFocus(false);
            setMatchPwd("");
            setValidMatch(false);
            setMatchFocus(false);
        }
        console.log(email, firstName, lastName, patronymic, password);
    }

    return (
        <> {registerStatus === 1 ? (
            <h1>Вы успешно зарегистрировались.<br />
                Письмо с подтверждением регистрации было отправлено на указанную при регистрации почту.</h1>
        ) : (
            <div className="border rounded-3 p-2">
                <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1 className="bg-theme rounded-3 text-center p-2">Регистрация</h1>
                <form className="p-2 fs-5" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                            Email:
                            <span className={validEmail ? "valid" : "hide"}>
                                <BsFillCheckCircleFill />
                            </span>
                            <span className={validEmail || !email ? "hide" : "invalid"}>
                                <BsFillXCircleFill />
                            </span>
                        </label>
                        <input className="form-control"
                            type="text"
                            id="email"
                            size={24}
                            maxLength={24}
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => { setEmail(e.target.value) }}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions fs-6" : "offscreen"}>
                            <BsInfoSquareFill />
                            {EMAIL_TIP}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="firstName">
                            Имя:
                            <span className={validFirstName ? "valid" : "hide"}>
                                <BsFillCheckCircleFill />
                            </span>
                            <span className={validFirstName || !firstName ? "hide" : "invalid"}>
                                <BsFillXCircleFill />
                            </span>
                        </label>
                        <input className="form-control"
                            type="text"
                            id="firstName"
                            size={24}
                            maxLength={24}
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => { setFirstName(e.target.value) }}
                            required
                            aria-invalid={validFirstName ? "false" : "true"}
                            aria-describedby="fnnote"
                            onFocus={() => setFirstNameFocus(true)}
                            onBlur={() => setFirstNameFocus(false)}
                        />
                        <p id="fnnote" className={firstNameFocus && firstName && !validFirstName ? "instructions fs-6" : "offscreen"}>
                            <BsInfoSquareFill />
                            {NAME_TIP}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="patronymic">
                            Отчество:
                            <span className={validPatronymic ? "valid" : "hide"}>
                                <BsFillCheckCircleFill />
                            </span>
                            <span className={validPatronymic || !patronymic ? "hide" : "invalid"}>
                                <BsFillXCircleFill />
                            </span>
                        </label>
                        <input className="form-control"
                            type="text"
                            id="patronymic"
                            size={24}
                            maxLength={24}
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => { setPatronymic(e.target.value) }}
                            required
                            aria-invalid={validPatronymic ? "false" : "true"}
                            aria-describedby="pnote"
                            onFocus={() => setPatronymicFocus(true)}
                            onBlur={() => setPatronymicFocus(false)}
                        />
                        <p id="pnote" className={patronymicFocus && patronymic && !validPatronymic ? "instructions fs-6" : "offscreen"}>
                            <BsInfoSquareFill />
                            {NAME_TIP}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="lastName">
                            Фамилия:
                            <span className={validLastName ? "valid" : "hide"}>
                                <BsFillCheckCircleFill />
                            </span>
                            <span className={validLastName || !lastName ? "hide" : "invalid"}>
                                <BsFillXCircleFill />
                            </span>
                        </label>
                        <input className="form-control"
                            type="text"
                            id="lastName"
                            size={24}
                            maxLength={24}
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => { setLastName(e.target.value) }}
                            required
                            aria-invalid={validLastName ? "false" : "true"}
                            aria-describedby="lnnote"
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}
                        />
                        <p id="lnnote" className={lastNameFocus && lastName && !validLastName ? "instructions fs-6" : "offscreen"}>
                            <BsInfoSquareFill />
                            {NAME_TIP}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">
                            Пароль:
                            <span className={validPwd ? "valid" : "hide"}>
                                <BsFillCheckCircleFill />
                            </span>
                            <span className={validPwd || !password ? "hide" : "invalid"}>
                                <BsFillXCircleFill />
                            </span>
                        </label>
                        <input className="form-control"
                            type="password"
                            id="password"
                            size={24}
                            minLength={8}
                            maxLength={24}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions fs-6" : "offscreen"}>
                            <BsInfoSquareFill />
                            {PWD_TIP}
                        </p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor='password'>
                            Подтвердить пароль:
                            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                <BsFillCheckCircleFill />
                            </span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                <BsFillXCircleFill />
                            </span>
                        </label>
                        <input className="form-control"
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => { setMatchPwd(e.target.value) }}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions fs-6" : "offscreen"}>
                            <BsInfoSquareFill />
                            Поля должны совпадать
                        </p>
                    </div>

                    <button className="btn btn-layout fs-5" disabled={!validEmail || !validPwd || !validMatch ? true : false}>
                        Зарегистрироваться</button>
                </form>
                <div className="pt-3">
                    <p>Уже зарегистрированы?<br />
                        <span className="line">
                            <Link to="/login">
                                Войти
                            </Link>
                        </span>
                    </p>
                </div>

            </div>
        )}</>
    )
}

export default RegisterComponent