import React, { useState, useRef, useEffect } from 'react';
import Checkbox from '../CheckboxDefault/CheckboxDefault';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import './SubventionCard.css';

interface CardProps {
  title: string;
  compatibility: number;
  provider: string;
  amount: string;
  details: string;
  sub_at_link: string;
  sub_deadline: string;
  sub_start: string;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  compatibility, 
  provider, 
  amount, 
  details, 
  sub_at_link, 
  sub_deadline, 
  sub_start 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false); 
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleDetailsToggle = () => {
    setShowDetails(prevState => !prevState);
  };

  const handleHighlightToggle = () => {
    setIsHighlighted(prevState => !prevState);
  };

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.style.height = showDetails ? `${detailsRef.current.scrollHeight}px` : '0px';
    }
  }, [showDetails]);

  const getBackgroundGradient = (compatibility: number) => {
    if (compatibility >= 80) {
      return 'linear-gradient(45deg, #00e676, #66ff66)'; // Vert éclatant et saturé
    } else if (compatibility >= 60) {
      return 'linear-gradient(45deg, #aeea00, #ffea00)'; // Vert citron vif tirant sur un jaune éclatant
    } else if (compatibility >= 40) {
      return 'linear-gradient(45deg, #ffeb3b, #ffc107)'; // Jaune vif et saturé (reste inchangé)
    } else if (compatibility >= 20) {
      return 'linear-gradient(45deg, #ffc107, #ff5722)'; // Orange vif tirant sur un rouge doux (reste inchangé)
    } else {
      return 'linear-gradient(45deg, #ff5722, #d50000)'; // Rouge vif et intense (reste inchangé)
    }
  };
  

  return (
    <div className={`card ${isHighlighted ? 'highlight' : ''}`}>
      <div 
        className="card-main-display"
      >
        <div className="card-header" style={{ background: getBackgroundGradient(compatibility) }} >
          <div className="subvention-title">{title}</div>
          <div className="subvention-compatibility">{compatibility}%</div>
          <InfoTooltip 
            info="La compatibilité représente la correspondance de votre projet avec les critères de cette aide." 
            size={15} 
            direction="left" 
            maxWidth="800px" 
          />
          {isHighlighted && <div className="selected-badge">Sélectionné</div>} {/* Badge de sélection */}
        </div>
        <div className="card-info-text">
          <p className="p">Montant financable maximum : {amount}</p>
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
            width="30%"
          />
          <Checkbox 
            id={`toggle-switch-${title.replace(/\s+/g, '-').toLowerCase()}`}
            labelInactive="Ajouter l'aide à mon projet"
            labelActive="Rétirer l'aide de mon projet"
            activeBackgroundColor="#cf1d1d" 
            inactiveBackgroundColor="#37de31" 
            activeTextColor="white"   
            inactiveTextColor="black" 
            width="70%"
            onClick={handleHighlightToggle}  
          />
        </div>
      </div>
      <div 
        className={`card-details-display ${showDetails ? 'show' : ''}`} 
        ref={detailsRef}
      >
        <div className="card-details-text">
          <p className="h3">Porteur de l'aide : {provider}</p>
          <p>Date d'ouverture : {sub_start}</p>
          <p>Date de clôture : {sub_deadline}</p>
          <p>Lien aide territoire: <a href={sub_at_link} target="_blank" rel="noopener noreferrer">{sub_at_link}</a></p>
        </div>
      </div>
    </div>
  );
};

export default Card;
