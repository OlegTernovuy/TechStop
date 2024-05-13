import { FC, ReactNode } from "react";

interface IButtonProps {
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  children: ReactNode;
  color?: string;
  bgColor?: string;
  disabled?: boolean;
  className?: string;
}

const Button: FC<IButtonProps> = ({
  type,
  disabled,
  onClick,
  children,
  color,
  bgColor,
  className,
}) => {
  const buttonStyles = `uppercase bg-${bgColor} hover:bg-${bgColor}-dark text-${color} font-bold py-2 px-4 rounded transition ease-out duration-300`;

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${buttonStyles} ${className} ${
        disabled ? "hover:bg-none" : `hover:bg-${bgColor}`
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
