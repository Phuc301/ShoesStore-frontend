import React from 'react';

interface LoadingProps {
  show: boolean;
}

const Loading: React.FC<LoadingProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="absolute inset-0 backdrop-blur-[2px]"></div>
      <div className="relative z-10 pointer-events-auto">
        <div className="w-12 h-12 border-4 border-t-[var(--color-orange-500)] border-gray-200 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
