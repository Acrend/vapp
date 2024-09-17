import React, { useState } from 'react';
import AutoCompleteFields from '../AutoCompleteFields/AutoCompleteFields';
import SearchEngineBox from '../SearchEngineBox/SearchEngineBox';
import './SearchEngineForms.css'; 

const SearchEngineForms: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const fields = ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Node.js']; // Example fields

  const handleAutoCompleteChange = (value: string) => {
    setInputValue(value);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSearchButtonClick = () => {
    console.log('Search initiated with:', {
      inputValue,
      searchInput,
    });
  };

  return (
    <div className="search-engine-forms-container">
      <div className="autofields-forms-containers">
        <AutoCompleteFields fields={fields} />
        <AutoCompleteFields fields={fields} />
      </div>
      <SearchEngineBox onInputChange={handleSearchInputChange} />
    </div>
  );
};

export default SearchEngineForms;
