import React, { useEffect, useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProductFiltersProps } from '@/interfaces/props/productFilter.prop';
import type { FilterItem } from '@/interfaces/options/productFilter.option';
import { fetchCategories } from '@/api';
import './style.css';

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  productCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    categories: true,
    price: true,
    colors: true,
  });

  const [brands, setBrands] = useState<FilterItem[]>([]);
  const [categories, setCategories] = useState<FilterItem[]>([]);
  const [colors, setColors] = useState<FilterItem[]>([]);
  useEffect(() => {
    getCategories();
    getColors();
    getBrands();
  }, []);

  const getCategories = async () => {
    try {
      const response = await fetchCategories();
      if (response) {
        const mappedCategories: FilterItem[] = response.map(
          (category: any) => ({
            label: category.name,
            key: category.slug,
          })
        );
        setCategories(mappedCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getColors = async () => {
    // try {
    //   const response = await fetchCategories();
    //   if (response) {
    //     const mappedColors: FilterItem[] = response.map((color: any) => ({
    //       label: color.name,
    //       key: color.slug,
    //     }));
    //     setColors(mappedColors);
    //   }
    // } catch (error) {
    //   console.error('Error fetching colors:', error);
    // }
    const fakeColors: FilterItem[] = [
      { key: 'red', label: '#ff0000' },
      { key: 'blue', label: '#0000ff' },
      { key: 'green', label: '#00ff00' },
      { key: 'gray', label: '#808080' },
      { key: 'white', label: '#ffffff' },
      { key: 'navy', label: '#000080' },
      { key: 'black', label: '#000000' },
      { key: 'white-green', label: '#a8d5ba' },
    ];
    setColors(fakeColors);
  };

  const getBrands = async () => {
    // try {
    //   const response = await fetchCategories();
    //   if (response) {
    //     const mappedBrands: FilterItem[] = response.map((brand: any) => ({
    //       label: brand.name,
    //       key: brand.slug,
    //     }));
    //     setBrands(mappedBrands);
    //   }
    // } catch (error) {
    //   console.error('Error fetching brands:', error);
    // }
    const fakeBrands: FilterItem[] = [
      { key: 'Nike', label: 'Nike' },
      { key: 'Adidas', label: 'Adidas' },
      { key: 'Puma', label: 'Puma' },
      { key: 'New Balance', label: 'New Balance' },
      { key: 'Converse', label: 'Converse' },
    ];
    setBrands(fakeBrands);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleColorChange = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onFiltersChange({ ...filters, colors: newColors });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFiltersChange({ ...filters, priceRange: [min, max] });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      brands: [],
      categories: [],
      priceRange: [0, 10000000],
      colors: [],
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
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-semibold">Bộ lọc</span>
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
          <h3 className="text-lg font-semibold text-gray-900">
            Bộ lọc sản phẩm
          </h3>
          <button
            onClick={clearAllFilters}
            className="text-sm text-orange-500 hover:text-orange-600 font-medium"
          >
            Xóa tất cả
          </button>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          Tìm thấy{' '}
          <span className="font-semibold text-orange-500">{productCount}</span>{' '}
          sản phẩm
        </div>

        {/* Brands Filter */}
        <FilterSection
          title="Thương hiệu"
          isExpanded={expandedSections.brands}
          onToggle={() => toggleSection('brands')}
        >
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand.key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand.key)}
                  onChange={() => handleBrandChange(brand.key)}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {brand.label}
                </span>
              </label>
            ))}
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
              <label key={category.key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.key)}
                  onChange={() => handleCategoryChange(category.key)}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {category.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
        {/* Price Filter */}
        <FilterSection
          title="Khoảng giá"
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-4">
            {/* Range Slider */}
            <div className="px-2">
              <div className="relative">
                <input
                  type="range"
                  min={0}
                  max={filters.priceRange[1]}
                  step={100000}
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    handlePriceChange(
                      Number(e.target.value),
                      filters.priceRange[1]
                    )
                  }
                  className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer"
                />
                <input
                  type="range"
                  min={filters.priceRange[0]}
                  max={5000000}
                  step={100000}
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    handlePriceChange(
                      filters.priceRange[0],
                      Number(e.target.value)
                    )
                  }
                  className="absolute w-full h-2 bg-transparent rounded-lg appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="h-2 bg-gray-200 rounded-lg">
                  <div
                    className="h-2 bg-orange-500 rounded-lg absolute"
                    style={{
                      left: `${(filters.priceRange[0] / 5000000) * 100}%`,
                      right: `${
                        100 - (filters.priceRange[1] / 5000000) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Hiển thị giá trị */}
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Từ</div>
                <div className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white">
                  {filters.priceRange[0].toLocaleString('vi-VN')} ₫
                </div>
              </div>
              <span className="text-gray-500 mt-5">-</span>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Đến</div>
                <div className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white">
                  {filters.priceRange[1].toLocaleString('vi-VN')} ₫
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Giá tính bằng VNĐ
            </div>
          </div>
        </FilterSection>

        {/* Colors Filter */}
        {/* <FilterSection
          title="Màu sắc"
          isExpanded={expandedSections.colors}
          onToggle={() => toggleSection('colors')}
        >
          <div className="grid grid-cols-4 gap-3">
            {colors.map((color) => (
              <button
                key={color.key}
                onClick={() => handleColorChange(color.key)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  filters.colors.includes(color.key)
                    ? 'border-orange-500 ring-2 ring-orange-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.label }}
                title={color.key}
              >
                {color.label === '#FFFFFF' && (
                  <div className="w-full h-full rounded-full border border-gray-200"></div>
                )}
              </button>
            ))}
          </div>
        </FilterSection> */}
      </div>
    </>
  );
};

export default ProductFilters;
