import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import type { Category } from '../../../interfaces/admin/ProductManagement/category.interface';
import { formatCurrency } from '@/utils/formatCurrency.util';

interface SearchAndFilterProps {
  searchTerm: string;
  selectedCategory: string;
  selectedBrand: string;
  sortBy: number;
  categories?: Category[];
  brands?: string[];
  onSearchChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  onSortByChange: (value: number) => void;
}

interface ActiveFilter {
  type: string;
  value: string;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  selectedCategory,
  selectedBrand,
  sortBy,
  categories = [],
  brands = [],
  onSearchChange,
  onBrandChange,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSortByChange,
}) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState<string | null>(
    null
  );
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [statusValue, setStatusValue] = useState('Còn hàng');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categoryValue, setCategoryValue] = useState('');

  const [availableColors] = useState([
    'Black',
    'White',
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Brown',
    'Gray',
    'Navy',
  ]);

  const filterTypes = [
    'Giá tiền',
    // 'Màu sắc',
    // 'Tình trạng hàng',
  ];

  const handleSelectFilter = (filter: string) => {
    setSelectedFilterType(filter);
    setShowFilterMenu(false);
  };

  const handleAddFilter = () => {
    if (!selectedFilterType) return;

    let value = '';
    if (selectedFilterType === 'Trạng thái') {
      value = statusValue;
    } else if (selectedFilterType === 'Giá tiền') {
      value =
        formatCurrency(minPrice ? parseInt(minPrice) : 0) +
        ' - ' +
        formatCurrency(maxPrice ? parseInt(maxPrice) : 1000000000000);
      onMinPriceChange(minPrice ? parseInt(minPrice) : 0);
      onMaxPriceChange(maxPrice ? parseInt(maxPrice) : 1000000000);
    } else if (selectedFilterType === 'Màu sắc') {
      value = availableColors.find((c) => c === categoryValue) || '';
    } else if (selectedFilterType === 'Tình trạng hàng') {
      value = statusValue;
    }

    const newFilter: ActiveFilter = {
      type: selectedFilterType,
      value,
    };

    const exists = activeFilters.find((f) => f.type === selectedFilterType);
    if (exists) {
      setActiveFilters(
        activeFilters.map((f) =>
          f.type === selectedFilterType ? newFilter : f
        )
      );
    } else {
      setActiveFilters([...activeFilters, newFilter]);
    }

    setSelectedFilterType(null);
    setMinPrice('');
    setMaxPrice('');
    setCategoryValue('');
  };

  const handleRemoveFilter = (type: string) => {
    setActiveFilters(activeFilters.filter((f) => f.type !== type));
    if (type === 'Giá tiền') {
      onMinPriceChange(0);
      onMaxPriceChange(1000000000);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 relative mb-2">
      {/* Thanh tìm kiếm + chọn danh mục */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex mr-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Nhập từ khóa để tìm kiếm ..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 w-65 input-base"
          />
        </div>

        <div className="flex items-center space-x-1 ml-2 relative">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="input-base mr-2 min-h-12"
          >
            {categories.map((category) => (
              <option key={category.categoryId} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="input-base mr-2 min-h-12"
          >
            <option value="">Tất cả thương hiệu </option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortByChange(Number(e.target.value))}
            className="input-base min-h-12"
          >
            <option value="">Sắp xếp theo </option>
            <option value="1">Giá thấp -{'>'} cao</option>
            <option value="2">Giá cao -{'>'} thấp</option>
            <option value="3">Tên A-{'>'}Z</option>
            <option value="4">Đánh giá cao -{'>'} thấp</option>
          </select>

          {/* Nút Thêm bộ lọc */}
          <button
            onClick={() => {
              setShowFilterMenu(!showFilterMenu);
              setSelectedFilterType(null);
            }}
            className="ml-2 text-orange-600 hover:underline min-w-15 text-left"
          >
            + Khác
          </button>

          {/* Popup chọn loại filter */}
          {showFilterMenu && (
            <div className="absolute top-full right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {filterTypes.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleSelectFilter(filter)}
                  className="w-full text-left px-4 py-2 hover:bg-orange-100"
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popup con theo loại filter */}
      {selectedFilterType && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4">
          <h4 className="font-semibold mb-2 text-gray-700">
            {selectedFilterType}
          </h4>

          {/* Bộ lọc Màu sắc */}
          {selectedFilterType === 'Màu sắc' && (
            <select
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
            >
              <option value="">-- Chọn màu sắc --</option>
              {availableColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          )}

          {/* Bộ lọc Trạng thái */}
          {selectedFilterType === 'Tình trạng hàng' && (
            <select
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
            >
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
              <option value="Sắp hết hàng">Sắp hết hàng</option>
              <option value="Sắp về hàng">Sắp về hàng</option>
            </select>
          )}

          {/* Bộ lọc Giá tiền */}
          {selectedFilterType === 'Giá tiền' && (
            <div className="flex space-x-2 mb-3">
              <input
                type="number"
                placeholder="Từ"
                value={minPrice}
                min={0}
                step={50000}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value));
                  setMinPrice(String(value));

                  // Nếu max nhỏ hơn min thì đẩy max lên bằng min
                  if (Number(maxPrice) < value) {
                    setMaxPrice(String(value));
                  }
                }}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 input-base"
              />

              <input
                type="number"
                placeholder="Đến"
                value={maxPrice}
                min={minPrice || 0} 
                step={50000}
                onChange={(e) => {
                  const value = Math.max(
                    Number(minPrice),
                    Number(e.target.value)
                  );
                  setMaxPrice(String(value));
                }}
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 input-base"
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setSelectedFilterType(null)}
              className="px-3 py-1 text-sm border rounded-lg text-gray-500 hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              onClick={handleAddFilter}
              className="px-3 py-1 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Thêm
            </button>
          </div>
        </div>
      )}

      {/* Hiển thị các thẻ filter đã chọn */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {activeFilters.map((filter) => (
            <div
              key={filter.type}
              className="flex items-center bg-orange-100 text-orange-700 px-3 py-1 rounded-full"
            >
              <span className="font-medium">
                {filter.type}: {filter.value}
              </span>
              <X
                className="ml-2 w-4 h-4 cursor-pointer"
                onClick={() => handleRemoveFilter(filter.type)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
