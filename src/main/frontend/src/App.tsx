import './App.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import ListAllTasksComponent from './components/ListAllTasksComponent';
import CreateOrUpdateTaskComponent from './components/CreateOrUpdateTaskComponent';
import InfoComponent from './components/InfoComponent';
import LayoutComponent from './components/LayoutComponent';
import ListedTasksComponent from './components/ListedTasksComponent';
import ContactsComponent from './components/ContactsComponent';
import TaskCardComponent from './components/TaskCardComponent';
import SearchComponent from './components/SearchComponent';
import NotFoundComponent from './components/NotFoundComponent';
import FooterComponent from './components/FooterComponent';
import Login from './components/Login';
import { RequireAuth } from './hoc/RequireAuth'
import Register from './components/Register';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutComponent />}>
            <Route path="tasks/*" element={<RequireAuth><ListAllTasksComponent /></RequireAuth>} >
              <Route path=":statusId/*" element={<RequireAuth><ListedTasksComponent /></RequireAuth>} />
              <Route path="task/*" element={<RequireAuth><TaskCardComponent /></RequireAuth>}>
                <Route path=":id/*" element={<RequireAuth><CreateOrUpdateTaskComponent /></RequireAuth>} />
              </Route>
            </Route>
            <Route path="login" element={<Register />}></Route>
            <Route path="search/*" element={<RequireAuth><SearchComponent searchKey={0} /></RequireAuth>}></Route>
            <Route path="info/*" element={<RequireAuth><InfoComponent /></RequireAuth>}></Route>
            <Route path="contacts/*" element={<RequireAuth><ContactsComponent /></RequireAuth>}></Route>
            <Route path="not-found/*" element={<RequireAuth><NotFoundComponent /></RequireAuth>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
}

export default App;