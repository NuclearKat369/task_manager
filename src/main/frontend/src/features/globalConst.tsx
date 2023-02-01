export const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]+@[^\s@]+\.[^\s@]+$/;
export const NAME_REGEX = /^[а-яА-Я]{3,23}$/;
export const PWD_REGEX = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const EMAIL_TIP = <>От 4 до 24 символов.<br /> Допустимые символы: латинские буквы, цифры, символы _-</>
export const NAME_TIP = <>До 24 символов.<br /> Допустимы только буквы кириллицы</>
export const PWD_TIP = <>От 8 до 24 символов<br />
    Должен содержать заглавные и строчные буквы, цифры, специальные символы<br />
    Допустимые символы: <span aria-label="exclamation mark">!</span>
    <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span>
    <span aria-label="percent">%</span></>;

export const API_BASE_URL = "http://localhost:8080";
export const FILEDATA_API_BASE_URL = "http://localhost:8080/files";
export const TASK_API_BASE_URL = "/tasks";
export const STATUS_API_BASE_URL = "/showStatus";
export const SUBTYPE_API_BASE_URL = "/showSubtype";
export const EMPLOYEE_API_BASE_URL = "/employees";
export const TASK_HISTORY_API_BASE_URL = "/tasks-history";
export const DEPARTMENT_API_BASE_URL = "/departments";
export const POSITION_API_BASE_URL = "/positions";
export const ROLE_API_BASE_URL = "/roles";