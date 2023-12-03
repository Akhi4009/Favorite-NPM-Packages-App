import React, { ChangeEvent } from 'react';


interface CustomInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<CustomInputProps> = ({ label, value, onChange }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="w-80 mx-auto">
      {label && <label className='block mb-3'>{label}</label>}
      <input className="border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500" type="text" value={value} onChange={handleInputChange}  />
    </div>
  );
};


export default Input;
