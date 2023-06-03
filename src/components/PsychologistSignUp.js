import React, { useState, useEffect } from 'react';
import psychologistStore from '../stores/PsychologistStore';
import { registerPsychologist } from '../actions/PsychologistActions';
import { PSYCHOLOGIST_REGISTERED, PSYCHOLOGIST_REGISTER_ERROR } from '../constants/ActionTypes';

const PsychologistSignUp = (props) => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
  });

  useEffect(() => {

    const handleRegistered = () => {
      window.alert("Kayıt başarılı!");
    };

    const handleRegisterError = () => {
      console.log("Kayit basarisiz.");
      window.alert("Kayit basarisiz!!");
    };

    psychologistStore.on(PSYCHOLOGIST_REGISTERED, handleRegistered);
    psychologistStore.on(PSYCHOLOGIST_REGISTER_ERROR, handleRegisterError);

    return () => {
      psychologistStore.off(PSYCHOLOGIST_REGISTERED, handleRegistered);
      psychologistStore.off(PSYCHOLOGIST_REGISTER_ERROR, handleRegisterError);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerPsychologist(formData);
  };

  const { email, password, confirmPassword, name, surname } = formData;

  return (
    <div>
    <div className="form-container">
      <h2>Psikolog Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">İsim:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Soyisim:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={handleInputChange}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Şifre Tekrarı:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
    </div>
  );
};

export default PsychologistSignUp;