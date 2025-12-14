import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, Percent } from 'lucide-react';

interface FilterOptions {
  categories: string[];
  brands: string[];
  discountRange: [number, number];
  sortBy: string;
}

interface PromotionFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  productCount: number;
}

const PromotionFilters: React.FC<PromotionFiltersProps> = ({
  filters,
  onFiltersChange,
  productCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    discount: true,
    sort: true,
  });

  const categories = ['Thể thao', 'Sneaker', 'Boots', 'Sandals', 'Casual'];
  const brands = ['Nike', 'Adidas', 'Converse', 'Vans', 'Puma', 'New Balance'];
  const sortOptions = [
    { value: 'discount-desc', label: 'Giảm giá cao nhất' },
    { value: 'discount-asc', label: 'Giảm giá thấp nhất' },
    { value: 'price-asc', label: 'Giá: Thấp đến cao' },
    { value: 'price-desc', label: 'Giá: Cao đến thấp' },
    { value: 'newest', label: 'Sản phẩm mới nhất' },
    { value: 'popular', label: 'Bán chạy nhất' },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleDiscountChange = (min: number, max: number) => {
    onFiltersChange({ ...filters, discountRange: [min, max] });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({ ...filters, sortBy });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      brands: [],
      discountRange: [0, 100],
      sortBy: 'discount-desc',
    });
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }: any) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
      >
        {title}
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {isExpanded && children}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full bg-white p-4 rounded-lg shadow-sm border"
        >
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-red-500" />
            <span className="font-semibold">Bộ lọc khuyến mãi</span>
            <span className="text-sm text-gray-500">
              ({productCount} sản phẩm)
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Filter Panel */}
      <div
        className={`bg-white rounded-lg shadow-sm p-6 ${
          isOpen ? 'block' : 'hidden'
        } lg:block`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Percent className="h-6 w-6 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Bộ lọc khuyến mãi
            </h3>
          </div>
          <button
            onClick={clearAllFilters}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Xóa tất cả
          </button>
        </div>

        <div className="text-sm text-gray-600 mb-6 bg-red-50 p-3 rounded-lg">
          Tìm thấy{' '}
          <span className="font-semibold text-red-500">{productCount}</span> sản
          phẩm đang khuyến mãi
        </div>

        {/* Sort Options */}
        <FilterSection
          title="Sắp xếp theo"
          isExpanded={expandedSections.sort}
          onToggle={() => toggleSection('sort')}
        >
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sortBy === option.value}
                  onChange={() => handleSortChange(option.value)}
                  className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Discount Range Filter */}
        <FilterSection
          title="Mức giảm giá"
          isExpanded={expandedSections.discount}
          onToggle={() => toggleSection('discount')}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="number"
                placeholder="Từ %"
                value={filters.discountRange[0] || ''}
                onChange={(e) =>
                  handleDiscountChange(
                    Number(e.target.value) || 0,
                    filters.discountRange[1]
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-red-500 focus:border-red-500"
                min="0"
                max="100"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Đến %"
                value={
                  filters.discountRange[1] === 100
                    ? ''
                    : filters.discountRange[1]
                }
                onChange={(e) =>
                  handleDiscountChange(
                    filters.discountRange[0],
                    Number(e.target.value) || 100
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-red-500 focus:border-red-500"
                min="0"
                max="100"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDiscountChange(10, 30)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                10% - 30%
              </button>
              <button
                onClick={() => handleDiscountChange(30, 50)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                30% - 50%
              </button>
            </div>
          </div>
        </FilterSection>

        {/* Categories Filter */}
        <FilterSection
          title="Loại giày"
          isExpanded={expandedSections.categories}
          onToggle={() => toggleSection('categories')}
        >
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Brands Filter */}
        <FilterSection
          title="Thương hiệu"
          isExpanded={expandedSections.brands}
          onToggle={() => toggleSection('brands')}
        >
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </>
  );
};

export default PromotionFilters;
