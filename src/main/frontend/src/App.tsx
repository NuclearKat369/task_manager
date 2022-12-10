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

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutComponent />}>
            <Route path="tasks/*" element={<ListAllTasksComponent />} >
              <Route path=":statusId/*" element={<ListedTasksComponent />} />
              <Route path="task/*" element={<TaskCardComponent />}>
                <Route path=":id/*" element={<CreateOrUpdateTaskComponent />} />
              </Route>
            </Route>
            {/* <Route path="task/*" element={<TaskCardComponent />}>
              <Route path=":id/*" element={<CreateOrUpdateTaskComponent />} ></Route>
            </Route> */}
            <Route path="search/*" element={<SearchComponent searchKey={0} />}></Route>
            <Route path="info/*" element={<InfoComponent />}></Route>
            <Route path="contacts/*" element={<ContactsComponent />}></Route>
            <Route path="not-found/*" element={<NotFoundComponent />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <FooterComponent />
    </div>
  );
}

export default App;