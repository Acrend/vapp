import React, { useEffect, useState } from 'react';
import './sub_container.css';

interface SubContainerProps {
  score: number;
  title: string;
}

const SubContainer: React.FC<SubContainerProps> = ({ score, title }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 300); // Assurez-vous que cela correspond à --transition-duration dans votre CSS
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="sub-container" style={{ opacity }}>
      <p>Title: {title}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default SubContainer;
