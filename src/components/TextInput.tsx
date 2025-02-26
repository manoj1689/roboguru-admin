import React from "react";

interface TextInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "email" | "number"; // Add other types as needed
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
}) => (
  <div>
    <label>{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} />
    {error && <span>{error}</span>}
  </div>
);

export default TextInput;
