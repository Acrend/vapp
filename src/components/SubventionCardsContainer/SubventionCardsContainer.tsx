import React from 'react';
import './SubventionCardsContainer.css';

interface SubventionCardsContainerProps {
  children: React.ReactNode;
}

const SubventionCardsContainer: React.FC<SubventionCardsContainerProps> = ({ children }) => {
  return (
    <div className="subvention-cards-container">
      {children}
    </div>
  );
};

export default SubventionCardsContainer;
