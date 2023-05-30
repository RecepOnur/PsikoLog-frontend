import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';
import PatientSignUp from './components/PatientSignUp';
import PatientSignIn from './components/PatientSignIn';
import PsychologistSignUp from './components/PsychologistSignUp';
import PsychologistSignIn from './components/PsychologistSignIn';

function App() {

  const [activePage, setActivePage] = useState("mainPage");
  
  const handlePageChange = (page) => {
    setActivePage(page);
  }

  return (
    <div>
      <Navbar changePage={handlePageChange}/>
      {activePage === "mainPage" && <MainPage changePage={handlePageChange}/>}
      {activePage === "patientSignUp" && <PatientSignUp changePage={handlePageChange}/>}
      {activePage === "patientSignIn" && <PatientSignIn changePage={handlePageChange}/>}
      {activePage === "psychologistSignUp" && <PsychologistSignUp changePage={handlePageChange}/>}
      {activePage === "psychologistSignIn" && <PsychologistSignIn changePage={handlePageChange}/>}
    </div>
  );
}

export default App;
