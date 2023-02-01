import './App.css';
import { Route, Routes } from 'react-router-dom';
import ListAllTasksComponent from './components/ListAllTasksComponent';
import InfoComponent from './components/InfoComponent';
import ContactsComponent from './components/ContactsComponent';
import TaskCardComponent from './components/TaskCardComponent';
import SearchComponent from './components/SearchComponent';
import NotFoundComponent from './components/NotFoundComponent';
import RequireAuth from './components/RequireAuth';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import LayoutComponent from './components/LayoutComponent';
import Unauthorized from './components/Unauthorized';
import ManagementComponent from './components/ManagementComponent';
import UserAccount from './components/UserAccount';
import EmployeeWorkloadComponent from './components/EmployeeWorkloadComponent';
import Employees from './components/Employees';
import EmployeeCardComponent from './components/EmployeeCardComponent';

const ROLES = {
  "Admin": 1,
  "Employee": 2,
  "IT Employee": 3
}

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          {/* Публичные маршруты */}
          <Route path="register" element={<RegisterComponent />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="contacts" element={<ContactsComponent />} />

          {/* Приватные маршруты */}
          <Route element={<RequireAuth allowedRoles={[2]} />}>
            <Route path="/" element={<LayoutComponent />} />
            <Route path="tasks" element={<ListAllTasksComponent />} >
              <Route path=":statusId" element={<ListAllTasksComponent />} />
            </Route>
            <Route path="task" element={<TaskCardComponent />}>
              <Route path=":id" element={<TaskCardComponent />} />
            </Route>
            <Route path="search" element={<SearchComponent searchKey={0} />} />
            <Route path="info" element={<InfoComponent />} />
            <Route element={<RequireAuth allowedRoles={[1]} />}>
              <Route path="management" element={<ManagementComponent />}>
                <Route path="workload" element={<EmployeeWorkloadComponent />} />
                <Route path="all-employees" element={<Employees />} />
                <Route path="employee/:employeeId" element={<EmployeeCardComponent />} />
              </Route>
            </Route>

            <Route path="account" element={<UserAccount />}></Route>
          </Route>

          {/* Публичные маршруты, ошибки */}
          <Route path="unauthorized/*" element={<Unauthorized />} />
          <Route path="not-found/*" element={<NotFoundComponent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;