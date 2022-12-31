import React, { useRef, useState, useEffect } from 'react'
import { BsFillCheckCircleFill, BsFillXCircleFill, BsInfoSquareFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8.24}$/;

const Register = () => {

    const userRef = useRef(null);
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd]);


    return (
        <div>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Регистрация</h1>
            <form>
                <label htmlFor='username'>
                    Email:
                    <span className={validName ? "valid" : "hide"}>
                        <BsFillCheckCircleFill />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <BsFillXCircleFill />
                    </span>
                </label>
                <br />
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => { setUser(e.target.value) }}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <BsInfoSquareFill />
                    От 4 до 24 символов.<br />
                    Начинаться с буквы.<br />
                    Буквы, цифры, _ и - допустимы.
                </p>
                <br />

                <label htmlFor='password'>
                    Пароль:
                    <span className={validPwd ? "valid" : "hide"}>
                        <BsFillCheckCircleFill />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <BsFillXCircleFill />
                    </span>
                </label>
                <br />
                <input
                    type="password"
                    id="password"
                    onChange={(e) => { setPwd(e.target.value) }}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
                    <BsInfoSquareFill />
                    От 8 до 24 символов.<br />
                    Должен содержать заглавные и строчные буквы, цифры, специальные символы.<br />
                    Допустимые символы: <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>


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


            </form>

        </div>
    )
}

export default Register