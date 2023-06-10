import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyComponent = () => {
  const currentDate = new Date().toLocaleDateString(); // Şu anki tarihi al

  return (
    <div className="container">
      <div className="position-relative border p-3" style={{ width: '200px', height: '100px' }}>
        <div className="position-absolute top-0 end-0 bg-light p-2">
          <p>{currentDate}</p>
        </div>
        <div className="p-2">
          <p>Örnek metin</p>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;