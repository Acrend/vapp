import React from 'react';
import './CheckboxDefault.css';

interface CheckboxProps {
  id: string;
  labelActive: string;
  labelInactive: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, labelActive, labelInactive }) => {
  return (
    <>
      <input type="checkbox" id={id} className="toggle-switch" />
      <label htmlFor={id} className="container">
        <div className="action">
          <span className="option-1">{labelInactive}</span>
          <span className="option-2">{labelActive}</span>
        </div>
      </label>
    </>
  );
};

export default Checkbox;
