import React, { useState, useEffect } from 'react';
import patientStore from '../stores/PatientStore';
import { registerPatient } from '../actions/PatientActions';
import { PATIENT_REGISTERED, PATIENT_REGISTER_ERROR } from '../constants/ActionTypes';

const PatientSignUp = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: ''
  });

  useEffect(() => {
    console.log("PatientSignUp useEffect çalıştı!");

    const handleRegistered = () => {
      window.alert("Kayıt başarılı!");
    };

    const handleRegisterError = () => {
      console.log("Kayit basarisiz.");
      window.alert("Kayit basarisiz!!");
    };

    patientStore.on(PATIENT_REGISTERED, handleRegistered);
    patientStore.on(PATIENT_REGISTER_ERROR, handleRegisterError);

    return () => {
      console.log("PatientSignUp useEffect");
      patientStore.off(PATIENT_REGISTERED, handleRegistered);
      patientStore.on(PATIENT_REGISTER_ERROR, handleRegisterError);
    };
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    console.log("PatientSignUp handlesubmit");
    event.preventDefault();
    registerPatient(formData);
  };

  const { email, password, confirmPassword, name, surname } = formData;

  return (
    <div>
    <div className="form-container">
      <h2>Hasta Kayıt Ol</h2>
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

export default PatientSignUp;
