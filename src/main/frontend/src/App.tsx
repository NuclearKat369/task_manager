import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListTaskComponent from './components/ListTaskComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateOrUpdateTaskComponent from './components/CreateOrUpdateTaskComponent';

function App() {
  return (
    <div>
      <Router>
          <HeaderComponent />
          <div className="container">
            <Routes>
              <Route path="/" element={<ListTaskComponent/>} ></Route>
              <Route path="/tasks" element={<ListTaskComponent/>} ></Route>
              <Route path="/add-task/:id" element={<CreateOrUpdateTaskComponent/>} ></Route>

            </Routes>
          </div>
          <div className='fixed-bottom'>
          <FooterComponent />
          </div>
      </Router>
    </div>
  );
}

export default App;
