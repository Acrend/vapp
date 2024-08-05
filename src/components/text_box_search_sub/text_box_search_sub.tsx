import React, { useRef, useEffect } from 'react';
import './text_box_search_sub.css'; 

interface TextBoxSearchSubProps {
  onInputChange: (value: string) => void;
}

const TextBoxSearchSub: React.FC<TextBoxSearchSubProps> = ({ onInputChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Spécifiez le type correct pour le ref

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit'; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height
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
    </div>
  );
};

export default TextBoxSearchSub;
