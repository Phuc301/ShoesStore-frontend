import React from 'react';

interface SocialButtonProps {
  provider: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-3">Tiếp tục với {provider}</span>
      </div>
    </button>
  );
};

export default SocialButton;
