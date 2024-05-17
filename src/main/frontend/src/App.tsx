import './App.css';
import { Route, Routes } from 'react-router-dom';
import ListAllTasks from './components/ListAllTasks';
import Info from './components/Info';
import Contacts from './components/Contacts';
import TaskCard from './components/TaskCard';
import Search from './components/Search';
import NotFound from './components/NotFound';
import RequireAuth from './components/RequireAuth';
import Register from './components/Register';
import Login from './components/Login';
import Layout from './components/Layout';
import Unauthorized from './components/Unauthorized';
import Management from './components/Management';
import UserAccount from './components/UserAccount';
import EmployeeWorkload from './components/EmployeeWorkload';
import Employees from './components/Employees';
import EmployeeCard from './components/EmployeeCard';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Публичные маршруты */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="contacts" element={<Contacts />} />

          {/* Приватные маршруты */}
          <Route element={<RequireAuth allowedRoles={[2]} />}>
            <Route path="/" element={<Layout />} />
            <Route path="tasks" element={<ListAllTasks />} >
              <Route path=":statusId" element={<ListAllTasks />} />
            </Route>
            <Route path="task" element={<TaskCard />}>
              <Route path=":id" element={<TaskCard />} />
            </Route>
            {/* <Route path="search" element={<Search searchKey={0} />} /> */}
            <Route path="info" element={<Info />} />
            <Route element={<RequireAuth allowedRoles={[1]} />}>
              <Route path="management" element={<Management />}>
                <Route path="workload" element={<EmployeeWorkload />} />
                <Route path="all-employees" element={<Employees />} />
                <Route path="employee/:employeeId" element={<EmployeeCard />} />
              </Route>
            </Route>

            <Route path="account" element={<UserAccount />}></Route>
          </Route>

          {/* Публичные маршруты, ошибки */}
          <Route path="unauthorized/*" element={<Unauthorized />} />
          <Route path="not-found/*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;