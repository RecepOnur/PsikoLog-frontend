import React, { useState, useEffect } from 'react';
import { loginPsychologist } from '../actions/PsychologistActions';
import { PSYCHOLOGIST_LOGGEDIN, PSYCHOLOGIST_LOGIN_ERROR } from '../constants/ActionTypes';
import psychologistStore from '../stores/PsychologistStore';
import { useNavigate } from 'react-router-dom';

const PsychologistSignIn = ({setIsLoggedIn}) => {

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
  
    psychologistStore.on(PSYCHOLOGIST_LOGGEDIN, handleLoggedIn);
    psychologistStore.on(PSYCHOLOGIST_LOGIN_ERROR, handleLoginError);
  
    return () => {
      psychologistStore.off(PSYCHOLOGIST_LOGGEDIN, handleLoggedIn);
      psychologistStore.off(PSYCHOLOGIST_LOGIN_ERROR, handleLoginError);
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
    loginPsychologist(formData);
  };

  const { email, password } = formData;

  return (
    <div>
    <div className="form-container">
      <h2>Psikolog Giris Yap</h2>
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

export default PsychologistSignIn;
