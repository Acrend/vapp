import React from 'react';
import Button from '../ButtonDefault/ButtonDefault';
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
          <Button label="Détail" />
          <Checkbox
            id={`toggle-switch-${title.replace(/\s+/g, '-').toLowerCase()}`}
            labelInactive="Ajouter l'aide à mon projet"
            labelActive="Aide ajoutée à mon projet"
          />
        </div>
      </div>
      <div className="card-details-display">
        {details}
      </div>
    </div>
  );
};

export default Card;
