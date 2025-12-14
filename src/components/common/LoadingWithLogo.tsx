import React from 'react';

interface LoadingWithLogoProps {
  show: boolean;
}

const LoadingWithLogo: React.FC<LoadingWithLogoProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      <div className="relative z-10 pointer-events-auto flex flex-col items-center justify-center">
        <div className="w-20 h-20 border-4 border-t-[var(--color-orange-500)] border-gray-200 rounded-full animate-spin"></div>
        <span className="mt-4 text-lg font-bold text-gray-900">
          Sole<span className="text-[var(--color-orange-500)]">Store</span>
        </span>
      </div>
    </div>
  );
};

export default LoadingWithLogo;
