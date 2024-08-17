import React from 'react';
import './FixedFields.css';

interface FixedFieldsProps {
  fields: string[];
}

const FixedFields: React.FC<FixedFieldsProps> = ({ fields }) => {
  return (
    <div className="fixed-fields">
      {fields.map((field, index) => (
        <div key={index} className="fixed-field">
          {field}
        </div>
      ))}
    </div>
  );
};

export default FixedFields;
