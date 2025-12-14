import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-[#FF6B35] transition-colors duration-200"
          >
            Chính sách bảo mật
          </a>
          <span className="hidden sm:block text-gray-300">|</span>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-[#FF6B35] transition-colors duration-200"
          >
            Điều khoản sử dụng
          </a>
          <span className="hidden sm:block text-gray-300">|</span>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-[#FF6B35] transition-colors duration-200"
          >
            Liên hệ
          </a>
        </div>
        <div className="text-center mt-2">
          <p className="text-xs text-gray-400">
            © 2025 SoleStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
