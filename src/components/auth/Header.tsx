import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Logo from '../common/Logo';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Logo />
        {/* Back to Home */}
        <button
          className="flex items-center space-x-2 text-gray-600 hover:text-[#FF6B35] transition-colors duration-200 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Về trang chủ</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
