import './App.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import ListAllTasksComponent from './components/ListAllTasksComponent';
import CreateOrUpdateTaskComponent from './components/CreateOrUpdateTaskComponent';
import InfoComponent from './components/InfoComponent';
import ListedTasksComponent from './components/ListedTasksComponent';
import ContactsComponent from './components/ContactsComponent';
import TaskCardComponent from './components/TaskCardComponent';
import SearchComponent from './components/SearchComponent';
import NotFoundComponent from './components/NotFoundComponent';
import FooterComponent from './components/FooterComponent';
import RequireAuth from './components/RequireAuth';
import Register from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import Layout from './components/Layout';
import Unauthorized from './components/Unauthorized';
import ManagementComponent from './components/ManagementComponent';
import Main from './components/Main';

const ROLES = {
  "Admin": 1,
  "Employee": 2,
  "IT Employee": 3
}

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="contacts" element={<ContactsComponent />} />

          {/* we wan to protect these routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Layout />} />
            <Route path="tasks" element={<ListAllTasksComponent />} >
              <Route path=":statusId" element={<ListAllTasksComponent />} />
            </Route>
            <Route path="task" element={<TaskCardComponent />}>
              <Route path=":id" element={<TaskCardComponent />} />
            </Route>
            <Route path="search" element={<SearchComponent searchKey={0} />} />
            <Route path="info" element={<InfoComponent />} />
            <Route path="management" element={<ManagementComponent />}></Route>
          </Route>

          {/* catch all */}
          <Route path="unauthorized/*" element={<Unauthorized />} />
          <Route path="not-found/*" element={<NotFoundComponent />} />

        </Route>
        {/* <Route path="/" element={<Register />}>
              <Route path="tasks/*" element={<ListAllTasksComponent />} >
                <Route path=":statusId/*" element={<ListedTasksComponent />} />
                <Route path="task/*" element={<TaskCardComponent />}>
                  <Route path=":id/*" element={<CreateOrUpdateTaskComponent />} />
                </Route>
              </Route>
              <Route path="login/*" element={<Register />}></Route>
              <Route path="search/*" element={<SearchComponent searchKey={0} />}></Route>
              <Route path="info/*" element={<InfoComponent />}></Route>
              <Route path="contacts/*" element={<ContactsComponent />}></Route>
              <Route path="not-found/*" element={<NotFoundComponent />}></Route>
            </Route> */}
      </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;