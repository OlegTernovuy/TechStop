import { ReactNode } from "react";

interface ModalContentProps {
  children: ReactNode;
  maxwidth?: string;
}

const ModalContent: React.FC<ModalContentProps> = ({ children, maxwidth }) => {
  return (
    <div
      className="bg-white relative rounded-lg p-6 shadow-lg z-50"
      style={{ maxWidth: maxwidth }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default ModalContent;
