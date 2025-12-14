import React, { useState } from 'react';
import { Search, Bell, Menu, User, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState(3);

  return (
    <header className="fixed top-0 right-0 left-0 bg-white border-b border-gray-200 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, orders, customers..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </a>
                <hr className="my-1" />
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
