import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <p>{message || 'An error occurred'}</p>
    </div>
  );
};

export default ErrorMessage;