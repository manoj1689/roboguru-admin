import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void; // Optional onClick handler
  type?: "button" | "submit" | "reset"; // Optional type with default value
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button" }) => (
  <button type={type} onClick={onClick}>
    {label}
  </button>
);

export default Button;
