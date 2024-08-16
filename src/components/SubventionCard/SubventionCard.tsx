import React, { useState, useRef, useEffect } from 'react';
import Checkbox from '../CheckboxDefault/CheckboxDefault';
import './SubventionCard.css';

interface CardProps {
  title: string;
  compatibility: string;
  provider: string;
  amount: string;
  details: string;
}

const Card: React.FC<CardProps> = ({ title, compatibility, provider, amount, details }) => {
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleDetailsToggle = () => {
    setShowDetails(prevState => !prevState);
  };

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.style.height = showDetails ? `${detailsRef.current.scrollHeight}px` : '0px';
    }
  }, [showDetails]);

  return (
    <div className="card">
      <div className="card-main-display">
        <div className="card-header">
          <div className="subvention-title">{title}</div>
          <div className="subvention-compatibility">{compatibility}</div>
        </div>
        <div className="text">
          <p className="h3">{provider}</p>
          <p className="p">{amount}</p>
        </div>
        <div className="card-button-container">
          <Checkbox 
            id={`toggle-switch-detail-${title.replace(/\s+/g, '-').toLowerCase()}`}
            labelActive="Réduire" 
            labelInactive="Détail" 
            activeBackgroundColor="#7a7a7a"
            inactiveBackgroundColor="#d6d6d6" 
            activeTextColor="white"   
            inactiveTextColor="black"
            onClick={handleDetailsToggle}  
            width="30%" // Spécifiez la largeur ici
          />
          <Checkbox 
            id={`toggle-switch-${title.replace(/\s+/g, '-').toLowerCase()}`}
            labelInactive="Ajouter l'aide à mon projet"
            labelActive="Rétirer l'aide de mon projet"
            activeBackgroundColor="#cf1d1d" 
            inactiveBackgroundColor="#37de31" 
            activeTextColor="white"   
            inactiveTextColor="black" 
            width="70%" // Spécifiez la largeur ici
          />
        </div>
      </div>
      <div 
        className={`card-details-display ${showDetails ? 'show' : ''}`} 
        ref={detailsRef}
      >
        {details}
      </div>
    </div>
  );
};

export default Card;
