import React, { useEffect, useState } from 'react';
import './sub_container.css';

interface SubContainerProps {
  score: number;
  title: string;
  sub_at_link:string; 
  sub_deadline:string;
  sub_start:string;
}

const SubContainer: React.FC<SubContainerProps> = ({ score, title, sub_at_link, sub_deadline, sub_start }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 300); // Assurez-vous que cela correspond à --transition-duration dans votre CSS
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="sub-container" style={{ opacity }}>
      <p>Titre: {title}</p>
      <p>Score: {score}</p>
      <p>Lien aide territoire: {sub_at_link}</p>
      <p>Ouverture des demandes : {sub_start}</p>
      <p>Fermeture des demandes : {sub_deadline}</p>
    </div>
  );
};

export default SubContainer;
