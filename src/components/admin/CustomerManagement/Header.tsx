import { Plus, Trash2 } from 'lucide-react';

interface HeaderProps {
  handleOpenDeleted: () => void;
  total: number
}

const Header: React.FC<HeaderProps> = ({
  handleOpenDeleted,
  total
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">QUẢN LÝ NGƯỜI DÙNG</h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleOpenDeleted}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Danh sách đen</span>
        </button>
        <span className="text-gray-500">Tổng số khách hàng: {total}</span>
      </div>
      
    </div>
  );
};

export default Header;
