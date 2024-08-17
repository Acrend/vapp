import React from 'react';
import './FormContainer.css';

interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return <div className="form-container">{children}</div>;
};

export default FormContainer;
