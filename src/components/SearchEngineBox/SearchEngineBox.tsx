import React, { useRef, useEffect } from 'react';
import './SearchEngineBox.css'; 
import Button from '../ButtonDefault/ButtonDefault'; 

interface SearchEngineBoxProps {
  onInputChange: (value: string) => void;
}

const handleButtonClick = () => {
    console.log('Button clicked!');
  };

const SearchEngineBox: React.FC<SearchEngineBoxProps> = ({ onInputChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Spécifiez le type correct pour le ref

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      const maxLines = 12;
      const lineHeight = 20; // Estimez ou mesurez la hauteur de ligne réelle en pixels
      textareaRef.current.style.height = 'inherit'; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height
  
      if (textareaRef.current.scrollHeight > lineHeight * maxLines) {
        textareaRef.current.style.height = `${lineHeight * maxLines}px`; // Max height
        textareaRef.current.style.overflowY = 'auto'; // Enable scrolling
      } else {
        textareaRef.current.style.overflowY = 'hidden'; // Disable scrolling
      }
    }
  };
  
  useEffect(() => {
    adjustHeight(); // Adjust height on mount
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
        onClick={handleButtonClick}
        isActive={true}
    />
    </div>
  );
};

export default SearchEngineBox;
