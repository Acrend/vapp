import React, { useState } from 'react';

interface TextBoxSearchSubProps {
  onInputChange: (inputData: string) => void;
}

function TextBoxSearchSub({ onInputChange }: TextBoxSearchSubProps) {
  const [inputData, setInputData] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputData(value);
    onInputChange(value);
  };

  return (
    <input
      type="text"
      value={inputData}
      onChange={handleChange}
      placeholder="Décrivez votre projet ici..."
    />
  );
}

export default TextBoxSearchSub;
