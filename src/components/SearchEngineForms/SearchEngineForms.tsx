import React, { useState } from 'react';
import AutoCompleteFields from '../AutoCompleteFields/AutoCompleteFields';
import SearchEngineBox from '../SearchEngineBox/SearchEngineBox';
import './SearchEngineForms.css'; 

interface SearchEngineFormsProps {
  onSearch: (value: string) => void;
}

const SearchEngineForms: React.FC<SearchEngineFormsProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const fields = ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Node.js'];

  const handleAutoCompleteChange = (value: string) => {
    setInputValue(value);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSearchButtonClick = () => {
    onSearch(searchInput); // Appelle la fonction `fetchInfo` dans App.tsx
  };

  return (
    <div className="search-engine-forms-container">
      <div className="autofields-forms-containers">
        <div className='simple-text'>
          Territoires
        </div>
        <AutoCompleteFields fields={fields} />
        <div className='simple-text'>
          Autre info
        </div>
        <AutoCompleteFields fields={fields} />
      </div>
      <SearchEngineBox
        onInputChange={handleSearchInputChange}
        onSearchButtonClick={handleSearchButtonClick}
      />
    </div>
  );
};

export default SearchEngineForms;
