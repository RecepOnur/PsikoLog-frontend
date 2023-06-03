import './App.css';
import { useEffect, useState } from 'react';
import MainPage from './components/MainPage';
import PatientSignUp from './components/PatientSignUp';
import PatientSignIn from './components/PatientSignIn';
import PsychologistSignUp from './components/PsychologistSignUp';
import PsychologistSignIn from './components/PsychologistSignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Psychologists from './components/Psychologists';
import ChatBot from './components/ChatBot';
import Navbar from './components/Navbar';
import { setAuthToken } from './config';
import PsychologistProfile from './components/PsychologistProfile';
import CreateAppointment from './components/CreateAppointment';
import myAxios from './config';
import Appointments from './components/Appointments';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(isLoggedIn);
    
    if (localStorage.getItem("token") != null) {
      setIsLoggedIn(true);
      setAuthToken(localStorage.getItem("token")); //Axios icin auth token
      console.log("Axios: " + myAxios.defaults.headers.common["Authorization"]);
    }
  }
    , [isLoggedIn])



  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          <Route
            path="/patientSignUp"
            element={<PatientSignUp />}
          />
          <Route
            path="/patientSignIn"
            element={<PatientSignIn setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/psychologistSignUp"
            element={<PsychologistSignUp />}
          />
          <Route
            path="/psychologistSignIn"
            element={<PsychologistSignIn setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/psychologists"
            element={<Psychologists />}
          />
          <Route
            path="/psychologists/:id"
            element={<PsychologistProfile />}
          />
          <Route
            path="/createAppointment/:id"
            element={<CreateAppointment />}
          />
          <Route
            path="/createAppointment/:id"
            element={<CreateAppointment />}
          />
          <Route
            path="/appointments"
            element={<Appointments />}
          />
          <Route
            path="/chatbot"
            element={<ChatBot />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
