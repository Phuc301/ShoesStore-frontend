import React from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  MessageSquare,
  Settings,
  Store,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/promotions', label: 'Promotions', icon: Tag },
  // { to: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
  // { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`fixed left-0 top-16 h-full bg-white border-r border-gray-200 z-20 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <div>
              <h2 className="text-lg font-bold text-gray-800">ShoeStore</h2>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          )}
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
