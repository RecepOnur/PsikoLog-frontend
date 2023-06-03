import React, { useState, useEffect } from 'react';
import { loginPatient } from '../actions/PatientActions';
import { PATIENT_LOGGEDIN, PATIENT_LOGIN_ERROR } from '../constants/ActionTypes';
import patientStore from '../stores/PatientStore';
import { useNavigate } from 'react-router-dom';

const PatientSignIn = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoggedIn = (token) => {
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      window.alert("Giriş başarılı!");
      navigate("/");
    };
  
    const handleLoginError = () => {
      console.log("Hatalı giriş yapıldı.");
      window.alert("Hatalı giriş!");
    };
  
    patientStore.on(PATIENT_LOGGEDIN, handleLoggedIn);
    patientStore.on(PATIENT_LOGIN_ERROR, handleLoginError);
  
    return () => {
      patientStore.off(PATIENT_LOGGEDIN, handleLoggedIn);
      patientStore.off(PATIENT_LOGIN_ERROR, handleLoginError);
    };
  }, [navigate, setIsLoggedIn]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginPatient(formData);
  };

  const { email, password } = formData;

  return (
    <div>
      <div className="form-container">
        <h2>Hasta Giris Yap</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-posta:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Şifre:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Giris Yap</button>
        </form>
      </div>
    </div>
  );
};

export default PatientSignIn;
