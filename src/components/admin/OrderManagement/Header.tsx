import React from 'react';

interface HeaderProps {
  totalOrders: number;
}

const Header: React.FC<HeaderProps> = ({ totalOrders }) => (
  <div className="flex items-center justify-between">
    <h1 className="text-2xl font-bold text-gray-800">QUẢN LÝ ĐƠN HÀNG</h1>
    <div className="text-sm text-gray-500">Tổng số đơn hàng: {totalOrders}</div>
  </div>
);

export default Header;
