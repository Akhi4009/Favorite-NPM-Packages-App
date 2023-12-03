import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-bold mb-2">{label}</label>}
      <textarea
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        {...props}
      />
    </div>
  );
};

export default TextArea;
