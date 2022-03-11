import logo from './logo.svg';
import './App.css';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Navbar from './Components/Navbar';
import TeamMembers from './Components/TeamMembers';
import Assignments from './Components/Assignments';
import { Route, Routes } from 'react-router-dom';
import Teams from './Components/Teams';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/teams" element={<Teams/> } />
        <Route path="/team-members" element={<TeamMembers/> } />
        <Route path="/assignments" element={<Assignments/> } />
      </Routes>
    </div>
  );
}

export default App;
