import { useEffect, useState } from "react";
import { selectCurrentUuid } from "../features/auth/authSlice";
import { useGetEmployeeByIdQuery } from "../features/employeesApiSlice";
import { useAppSelector } from "../features/store";
import { Link } from "react-router-dom";
import { PWD_REGEX, PWD_TIP } from "../features/globalConst";
import { BsFillCheckCircleFill, BsFillXCircleFill, BsInfoSquareFill } from "react-icons/bs";
import { useChangePasswordMutation } from "../features/auth/authApiSlice";

const UserAccount = () => {

  const user = useGetEmployeeByIdQuery({ employeeId: useAppSelector(selectCurrentUuid) }, { refetchOnMountOrArgChange: true });
  const [employee, setEmployee] = useState(null);

  const [alertText, setAlertText] = useState(null);

  const [changePassword] = useChangePasswordMutation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordFocus, setCurrentPasswordFocus] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [newPasswordFocus, setNewPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => { }, []);

  useEffect(() => {
    if (user.isSuccess) {
      setEmployee(user.data);
    }

  }, [user.isSuccess]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(newPassword));
    setValidMatch(newPassword === matchPwd);
  }, [newPassword, matchPwd]);

  const clearPwdForms = () => {
    setCurrentPassword("");
    setCurrentPasswordFocus(false);
    setNewPassword("");
    setValidPwd(false);
    setNewPasswordFocus(false);
    setMatchPwd("");
    setValidMatch(false);
    setMatchFocus(false);
    setAlertText(null);
  }

  const handleSubmit = async () => {
    console.log("handleSubmit");

    const response = await changePassword({
      currentPassword: currentPassword,
      newPassword: newPassword,
      employeeId: employee.uuid
    }).unwrap();

    console.log("response in change password:", response);

    if (response === 1) {
      setCurrentPassword("");
      setCurrentPasswordFocus(false);
      setNewPassword("");
      setValidPwd(false);
      setNewPasswordFocus(false);
      setMatchPwd("");
      setValidMatch(false);
      setMatchFocus(false);
    }
    switch (response) {
      case 0:
        setAlertText({ id: 0, text: "Текущий пароль указан неверно" });
        break;
      case 1:
        setAlertText({ id: 1, text: "Пароль успешно изменён" });
        break;
      case 2:
        setAlertText({ id: 2, text: "Новый пароль должен отличаться от текущего" });
        break;
      default:
        setAlertText({ id: 3, text: "Произошла ошибка" });
        break;
    }
  }


  let content = employee
    ? (
      <div className="p-3 fs-6">

        {/* UUID */}
        <div>
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            id="emailInput"
            size={24}
            maxLength={24}
            placeholder={employee.email}
            readOnly />
        </div>

        <div>

          {/* ФИО */}
          <div className="d-flex flex-row py-3">
            <div className="d-flex flex-column">
              <label htmlFor="lastNameInput" className="form-label">Фамилия</label>
              <input className="form-control" type="lastName" id="lastNameInput" placeholder={employee.lastName} readOnly />
            </div>
            <div className="d-flex flex-column px-3">
              <label htmlFor="firstNameInput" className="form-label">Имя</label>
              <input className="form-control" type="firstName" id="firstNameInput" placeholder={employee.firstName} readOnly />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="patronymicInput" className="form-label">Отчество</label>
              <input className="form-control" type="patronymic" id="patronymicInput" placeholder={employee.patronymic} readOnly />
            </div>
          </div>

          {/* Пароль */}
          <div className="d-flex flex-row py-3">
            <div className="d-flex flex-column">
              {/* Текущий пароль */}
              <div className="d-flex flex-row">
                <div className="d-flex flex-column">
                  <label className="form-label" htmlFor="currentPasswordInput">Текущий пароль</label>
                  <input className="form-control"
                    type="password"
                    id="currentPasswordInput"
                    placeholder="Текущий пароль"
                    size={24}
                    value={currentPassword}
                    onChange={(e) => { setCurrentPassword(e.target.value) }}
                    required
                    onFocus={() => setCurrentPasswordFocus(true)}
                    onBlur={() => setCurrentPasswordFocus(false)}
                  />
                </div>
              </div>

              {/* Новый пароль */}
              <div className="d-flex flex-row">
                <div className="d-flex flex-column  py-2">
                  <label className="form-label" htmlFor="newPasswordInput">
                    Новый пароль
                    <span className={validPwd ? "valid" : "hide"}>
                      <BsFillCheckCircleFill />
                    </span>
                    <span className={validPwd || !newPassword ? "hide" : "invalid"}>
                      <BsFillXCircleFill />
                    </span>
                  </label>
                  <input className="form-control"
                    type="password"
                    id="newPasswordInput"
                    placeholder="Новый пароль"
                    size={24}
                    minLength={8}
                    maxLength={24}
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value) }}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setNewPasswordFocus(true)}
                    onBlur={() => setNewPasswordFocus(false)}
                  />
                </div>
                <div className="d-flex flex-column px-2 align-self-center">
                  <div id="pwdnote" className={newPasswordFocus && !validPwd ? "pwd-change-instructions  fs-6" : "offscreen"}>
                    <BsInfoSquareFill />
                    {PWD_TIP}
                  </div>
                </div>
              </div>

              {/* Подтвердить новый пароль */}
              <div className="d-flex flex-row">
                <div className="d-flex flex-column  py-2">
                  <label className="form-label" htmlFor='confirmNewPasswordInput'>
                    Подтвердить новый пароль
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                      <BsFillCheckCircleFill />
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                      <BsFillXCircleFill />
                    </span>
                  </label>
                  <input className="form-control"
                    type="password"
                    id="confirmNewPasswordInput"
                    placeholder="Подтвердить новый пароль"
                    size={24}
                    minLength={8}
                    maxLength={24}
                    value={matchPwd}
                    onChange={(e) => { setMatchPwd(e.target.value) }}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                </div>
                <div className="d-flex flex-column px-2 align-self-center">
                  <div id="confirmnote" className={matchFocus && !validMatch ? "pwd-change-instructions  fs-6" : "offscreen"}>
                    <BsInfoSquareFill />
                    Поля должны совпадать
                  </div>
                </div>
              </div>

              {/* Кнопки */}
              <div className="d-flex flex-row py-3 justify-content-start">
                <div className="d-flex flex-column">
                  <button className="btn btn-success" onClick={handleSubmit}
                    disabled={!validPwd || !validMatch ? true : false}>Изменить пароль</button>
                </div>
                <div className="d-flex flex-column px-2">
                  <button className="btn btn-danger flex-fill"
                    onClick={() => {
                      clearPwdForms();
                    }}>Отмена</button>
                </div>
              </div>
              <div>
                {alertText != null
                  ? alertText.id === 1
                    ? <div className="alert alert-success alert-dismissible fade show" role="alert">
                      {alertText.text}
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    : <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {alertText.text}
                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                  : <></>
                }
              </div>
            </div>
          </div>

          {/* Отдел, должность */}
          <div>
            <div>
              <label htmlFor="departmentInput" className="form-label">Отдел</label>
              <input
                className="form-control" type="department"
                id="departmentInput" size={24} maxLength={24}
                placeholder={employee.department ? employee.department.departmentName : ""} readOnly />
            </div>
            <div className="py-2">
              <label htmlFor="positionInput" className="form-label">Должность</label>
              <input
                className="form-control" type="position"
                id="positionInput" size={24} maxLength={24}
                placeholder={employee.position ? employee.position.positionName : ""} readOnly />
            </div>
          </div>

          {/* Права */}
          <div className="flex-shrink-1 py-3">
            Права
            <table className="flex-shrink-1 border py-3">
              <tbody>
                {employee.roles.map((role) => {
                  return (
                    <tr className="d-flex flex-row border p-1">{role.name}</tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    )
    : (<>No data</>);


  return (
    <div className="fs-5">Учётная запись
      {content}
      <div className="fs-6" style={{ color: "#808080" }}>
        Если вы нашли ошибку в данных, пожалуйста, обратитесь к {<Link to="/contacts">администратору</Link>}

      </div>
    </div>
  )
}

export default UserAccount;