import React from "react";
import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchAndFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Nhập tên hoặc mã khuyến mãi cần tìm kiếm ..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
