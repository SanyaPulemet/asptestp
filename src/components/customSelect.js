import './inputField.css';
import React from 'react';

const CustomSelect = ({ label, options, value }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <div>
        <select
          value={value}
          className="appearance-none input-element w-full"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <img className="fill-current h-4 w-4" src="dropdown-icon.png"/>
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;