import React from 'react';
import './ButtonDefault.css';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, isActive }) => {
  return (
    <button
      className={`button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
