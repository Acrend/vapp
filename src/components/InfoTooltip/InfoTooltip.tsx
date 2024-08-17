import React, { useState } from 'react';
import './InfoTooltip.css';

interface InfoTooltipProps {
  info: string;
  size?: number; // Taille du "i", par défaut à 16px
  direction?: 'top' | 'right' | 'bottom' | 'left'; // Direction du tooltip
  maxWidth?: string; // Largeur maximale du tooltip, par exemple "200px"
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  info,
  size = 16,
  direction = 'top',
  maxWidth = '150px',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div 
      className="info-tooltip-container" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="info-icon" 
        style={{ width: size, height: size, fontSize: size * 0.75 }}
      >
        i
      </div>
      {isVisible && (
        <div
          className={`tooltip-box tooltip-${direction}`}
          style={{ maxWidth }}
        >
          {info}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
