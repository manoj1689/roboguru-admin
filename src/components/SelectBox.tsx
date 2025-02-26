import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectBoxProps {
  label: string;
  name: string;
  options: Option[];
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
}) => (
  <div>
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <span>{error}</span>}
  </div>
);

export default SelectBox;
