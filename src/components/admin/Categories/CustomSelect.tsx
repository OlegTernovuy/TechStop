import React, { useState } from "react";

interface CustomSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  error?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange([option]); // Ensure value is always an array
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="block w-full p-2 border border-gray-300  text-TechStopBlue font-bold rounded-md shadow-sm cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length > 0 ? value[0] : "Select a category"}
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-gray-700  shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option}
              className="p-2 hover:bg-TechStopBlue cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default CustomSelect;
