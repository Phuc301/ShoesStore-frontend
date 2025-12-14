import { Plus, Trash2 } from 'lucide-react';

interface HeaderProps {
  total: number;
  handleAddProduct: () => void;
  handleOpenDeleted: () => void;
}

const Header: React.FC<HeaderProps> = ({
  total,
  handleAddProduct,
  handleOpenDeleted,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">QUẢN LÝ SẢN PHẨM</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleOpenDeleted}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Sản phẩm đã xóa</span>
        </button>
        <button
          onClick={handleAddProduct}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm sản phẩm</span>
        </button>
        <span className="text-gray-500">Tổng số sản phẩm: {total}</span>
      </div>
    </div>
  );
};

export default Header;
