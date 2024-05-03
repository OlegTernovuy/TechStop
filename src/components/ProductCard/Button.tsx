import { FC, ReactNode } from "react";

interface IButtonProps {
  type: "submit" | "reset" | "button";
  onClick: () => void;
  children: ReactNode;
  color: string;
  bgColor: string;
  className?: string;
}

const Button: FC<IButtonProps> = ({
  type,
  onClick,
  children,
  color,
  bgColor,
  className,
}) => {
  const buttonStyles = `bg-${bgColor} hover:bg-${bgColor}-dark text-${color} font-bold py-2 px-4 rounded transition ease-out duration-300`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
