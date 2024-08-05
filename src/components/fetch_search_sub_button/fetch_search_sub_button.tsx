import React from 'react';

interface FetchButtonProps {
  onClick: () => void;
  label: string;
}

const FetchButton: React.FC<FetchButtonProps> = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default FetchButton;
