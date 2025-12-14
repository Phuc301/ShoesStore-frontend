import React from 'react';
import { Search } from 'lucide-react';

interface ProductSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
          placeholder="Tìm kiếm giày, thương hiệu..."
        />
      </div>
    </div>
  );
};

export default ProductSearch;
