import React from 'react';

interface FetchButtonProps {
  onClick: () => void;
  label: string;
}

function FetchButton({ onClick, label }: FetchButtonProps) {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
}

export default FetchButton;
