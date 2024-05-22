import React from 'react';
import './textField.css';

const TextField = ({ label, value }) => {
  return (
    <div className="text-field-container">
      <label className="text-field-label">
        {label}
      </label>
      <div className="text-field-input">
        {value}
      </div>
    </div>
  );
};

export default TextField;