import React, { useState } from 'react';
import './sub_container.css';

interface SubContainerProps {
  score: number;
  sub_score_ratio: number;
  title: string;
  sub_at_link: string;
  sub_deadline: string;
  sub_start: string;
  provider?: string;
  type?: string;
}

const SubContainer: React.FC<SubContainerProps> = ({
  score,
  sub_score_ratio,
  title,
  sub_at_link,
  sub_deadline,
  sub_start,
  provider,
  type,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fonction pour obtenir la couleur en fonction du ratio
  const getCircleColor = (sub_score_ratio: number) => {
    const red = Math.min(255, 255 * (1 - sub_score_ratio));
    const green = Math.min(255, 255 * sub_score_ratio);
    return `rgb(${red}, ${green}, 0)`;
  };

  const circleStyle = {
    '--circle-color': getCircleColor(sub_score_ratio),
    '--score-percentage': sub_score_ratio
  } as React.CSSProperties;

  return (
    <div className={`sub-container ${isExpanded ? 'show' : ''}`}>
      <div className="sub-container-header">
        <div className="title-container">
          <h2>{title}</h2>
        </div>
        <div className="circle-container">
          <div className="circle" style={circleStyle}>
            {Math.round(sub_score_ratio * 100)}%
          </div>
        </div>
      </div>
      <div className="details-link" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Réduire' : 'Détail'}
        <span>{isExpanded ? '∧' : '∨'}</span>
      </div>
      {isExpanded && (
        <div className="details">
          <p>Lien aide territoire: <a href={sub_at_link} target="_blank" rel="noopener noreferrer">{sub_at_link}</a></p>
          <p>Date d'ouverture : {sub_start}</p>
          <p>Date de clôture : {sub_deadline}</p>
        </div>
      )}
    </div>
  );
};

export default SubContainer;
