import React from 'react';

interface TextBoxSearchSubProps {
  onInputChange: (value: string) => void;
}

const TextBoxSearchSub: React.FC<TextBoxSearchSubProps> = ({ onInputChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <input type="text" onChange={handleChange} placeholder="Enter project description" />
  );
};

export default TextBoxSearchSub;