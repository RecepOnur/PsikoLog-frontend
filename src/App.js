import './App.css';
import { useState } from 'react';
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn);

  if(isLoggedIn){
    setAuthToken(localStorage.getItem("token"));
  }

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
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
            path="/chatbot"
            element={<ChatBot />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
