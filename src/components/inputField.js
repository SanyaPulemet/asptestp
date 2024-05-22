import React from 'react';
import './inputField.css';

const InputField = ({ label, value, register }) => {
  return (
    <div className="input-container">
        <label className="input-label">{label}</label>
        <input 
            {...register({register})} 
            placeholder={value} 
            className="input-element w-full" 
        />
    </div>
  );
};

export default InputField;