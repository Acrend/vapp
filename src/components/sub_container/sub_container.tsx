import React from 'react';
import './sub_container.css';

interface SubContainerProps {
  score: number;
  title: string;
}

const SubContainer: React.FC<SubContainerProps> = ({ score, title }) => {
  return (
    <div className="sub-container">
      <p>Title: {title}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default SubContainer;
