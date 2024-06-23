interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      onClick={onClick}
    >
      X
    </button>
  );
};

export default CloseButton;
