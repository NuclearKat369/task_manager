import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListAllTasksComponent from './components/ListAllTasksComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateOrUpdateTaskComponent from './components/CreateOrUpdateTaskComponent';
import InfoComponent from './components/InfoComponent';
import ListTasksByStatusComponent from './components/ListTasksByStatusComponent';
import LayoutComponent from './components/LayoutComponent';
import DynamicComponent from './components/DynamicComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/*" element={<LayoutComponent />}>
          <Route path="tasks*" element={<DynamicComponent />}>
            {/* <Route path="tasks/*" element={<ListAllTasksComponent />} > */}
              <Route path=":statusId/*" element={<ListTasksByStatusComponent />}/>
            </Route>

            <Route path="add-task/:id" element={<CreateOrUpdateTaskComponent />} ></Route>
            <Route path="info/*" element={<InfoComponent />}></Route>
          </Route>
        </Routes>
        <div className='fixed-bottom'>
          <FooterComponent />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;


// function App() {
//   return (
//     <div>
//       <Router>
//         <HeaderComponent />
//         <Routes>
//           <Route path="/*" element={
//             <div className="container">
//               <LayoutComponent />
//               {/* <div className="row align-items-start">
//                 <UpperComponent />
//               </div>
//               <div className="row align-items-start">
//                 <div className="col-2">
//                   <LeftSideComponent />
//                 </div>
//                 <div className="col-9">
//                   <ListAllTasksComponent />
//                 </div>
//               </div> */}
//             </div>
//           } >
//             <Route path="tasks/*" element={<ListTasksByStatusComponent />}>
//               <Route path=":statusId/*" element={<ListTasksByStatusComponent />} />
//             </Route>

//             <Route path="add-task/:id" element={<CreateOrUpdateTaskComponent />} ></Route>
//             <Route path="info" element={<InfoComponent />}></Route>

//           </Route>
//           {/* <Route path="tasks/*" element={<ListAllTasksComponent />} >
//                   <Route path=":statusId/*" element={<ListTasksByStatusComponent />} />
//                 </Route>
//                 <Route path="add-task/:id" element={<CreateOrUpdateTaskComponent />} ></Route>
//                 <Route path="info" element={<InfoComponent />}></Route> */}

//         </Routes>
//         <div className='fixed-bottom'>
//           <FooterComponent />
//         </div>
//       </Router>
//     </div>
//   );
// }