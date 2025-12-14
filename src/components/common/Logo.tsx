import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => navigate('/')}
    >
      <h1 className="text-2xl font-bold text-gray-900">
        Sole<span className="text-orange-500">Store</span>
      </h1>
    </div>
  );
};

export default Logo;
