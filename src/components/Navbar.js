import React from 'react';

function Navbar(props) {
  const handleButtonClick = (page) => {
    props.changePage(page);
  };

  return (
    <div className="container">
      <h1>PsikoLog</h1>
      <div className="button-container">
        <button className="button" onClick={() => handleButtonClick("patientSignUp")}>
          Hasta Kayıt
        </button>
        <button className="button" onClick={() => handleButtonClick("patientSignIn")}>
          Hasta Giriş
        </button>
        <button className="button" onClick={() => handleButtonClick("psychologistSignUp")}>
          Psikolog Kayıt
        </button>
        <button className="button" onClick={() => handleButtonClick("psychologistSignIn")}>
          Psikolog Giriş
        </button>
      </div>
    </div>
  );
}

export default Navbar;