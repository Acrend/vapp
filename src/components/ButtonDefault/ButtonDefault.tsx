import React from 'react';
import './ButtonDefault.css';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  isActive = false,
  activeBackgroundColor = '#4CAF50',
  inactiveBackgroundColor = '#f1f1f1',
  activeTextColor = '#ffffff',
  inactiveTextColor = '#000000',
}) => {
  const backgroundColor = isActive ? activeBackgroundColor : inactiveBackgroundColor;
  const textColor = isActive ? activeTextColor : inactiveTextColor;

  return (
    <button
      className={`button ${isActive ? 'active' : ''}`}
      onClick={onClick}
      style={{ backgroundColor, color: textColor }}
    >
      {label}
    </button>
  );
};

export default Button;
