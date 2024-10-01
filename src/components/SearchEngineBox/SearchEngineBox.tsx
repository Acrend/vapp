import React, { useRef, useEffect } from 'react';
import './SearchEngineBox.css'; 
import Button from '../ButtonDefault/ButtonDefault'; 

interface SearchEngineBoxProps {
  onInputChange: (value: string) => void;
  onSearchButtonClick: () => void;
}

const SearchEngineBox: React.FC<SearchEngineBoxProps> = ({ onInputChange, onSearchButtonClick }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      const maxLines = 12;
      const lineHeight = 20;
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      if (textareaRef.current.scrollHeight > lineHeight * maxLines) {
        textareaRef.current.style.height = `${lineHeight * maxLines}px`;
        textareaRef.current.style.overflowY = 'auto';
      } else {
        textareaRef.current.style.overflowY = 'hidden';
      }
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <div className="container">
      <textarea
        ref={textareaRef}
        onChange={handleChange}
        placeholder="Merci de décrire votre projet ici"
        maxLength={2000}
      />
      <Button
        label="Rechercher des aides"
        onClick={onSearchButtonClick}
        isActive={true}
      />
    </div>
  );
};

export default SearchEngineBox
