import React, { useState } from 'react';
import './AutoCompleteFields.css';

interface AutoCompleteFieldsProps {
  fields: string[];
}

const AutoCompleteFields: React.FC<AutoCompleteFieldsProps> = ({ fields }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filteredSuggestions = fields.filter((field) =>
        field.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete-fields-container">
      <div className="inputGroup">
        <input
          type="text"
          id="autocomplete-input"
          value={inputValue}
          onChange={handleInputChange}
          required
          autoComplete="off"
        />
        <label htmlFor="autocomplete-input">Name</label>
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteFields;
