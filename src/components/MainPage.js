import React from 'react';

function MainPage(props) {
  
  const handleButtonClick = (page) => {
    props.changePage(page);
  };

  return (
    <div className="container">
      <h1>Ana Sayfa</h1>
    </div>
  );
}

export default MainPage;