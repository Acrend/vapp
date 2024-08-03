import React, { useState } from 'react';

interface TextBoxSearchSubProps {
  onSearchSubmit: (inputData: string) => void;
  onInfoSubmit: (inputData: string) => void;
}

function TextBoxSearchSub({ onSearchSubmit, onInfoSubmit }: TextBoxSearchSubProps) {
  const [inputData, setInputData] = useState('');

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchSubmit(inputData);
  };

  const handleInfoSubmit = () => {
    onInfoSubmit(inputData);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        value={inputData}
        onChange={e => setInputData(e.target.value)}
        placeholder="Search for an animal..."
      />
      <button type="submit">Search</button>
      <button type="button" onClick={handleInfoSubmit}>Get Info</button>
    </form>
  );
}

export default TextBoxSearchSub;