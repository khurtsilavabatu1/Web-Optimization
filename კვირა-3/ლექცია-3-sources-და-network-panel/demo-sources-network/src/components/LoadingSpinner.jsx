import React from 'react';

const LoadingSpinner = ({ text = 'იტვირთება...' }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
};

export default LoadingSpinner;
