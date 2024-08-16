import React from 'react';
import './CheckboxDefault.css';

interface CheckboxProps {
  id: string;
  labelActive: string;
  labelInactive: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  onClick?: () => void; // Ajout de la propriété onClick
  width?: string; // Ajout de la propriété width
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  labelActive,
  labelInactive,
  activeBackgroundColor = '#4CAF50',
  inactiveBackgroundColor = '#f1f1f1',
  activeTextColor = '#ffffff',
  inactiveTextColor = '#000000',
  onClick,
  width = 'auto', // Largeur par défaut à auto
}) => {
  return (
    <>
      <input type="checkbox" id={id} className="toggle-switch" onClick={onClick} />
      <label
        htmlFor={id}
        className="container"
        style={{
          backgroundColor: `var(--${id}-background-color, ${inactiveBackgroundColor})`,
          color: `var(--${id}-text-color, ${inactiveTextColor})`,
          width, // Application de la largeur personnalisée
        }}
      >
        <div className="action">
          <span className="option-1">{labelInactive}</span>
          <span className="option-2">{labelActive}</span>
        </div>
      </label>
      <style>
        {`
          input#${id}:checked + label.container {
            --${id}-background-color: ${activeBackgroundColor};
            --${id}-text-color: ${activeTextColor};
          }
        `}
      </style>
    </>
  );
};

export default Checkbox;
