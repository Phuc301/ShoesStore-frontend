import React from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onAdd: () => void;
  total: number;
}

const Header: React.FC<Props> = ({ onAdd, total }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">
        QUẢN LÝ MÃ KHUYẾN MÃI
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={onAdd}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm mã khuyến mãi</span>
        </button>
        <span className="text-gray-500">Tổng số mã khuyến mãi: {total}</span>
      </div>
    </div>
  );
};

export default Header;
