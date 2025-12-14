import { useState, useEffect, useMemo } from 'react';
import PromotionHero from '@/components/user/promotion/PromotionHero';
import PromotionFilters from '@/components/user/promotion/PromotionFilters';
import PromotionGrid from '@/components/user/promotion/PromotionGrid';
import Breadcrumb from '@/components/user/Breadcrumb';
import Pagination from '@/components/common/Pagination';
import Newsletter from '@/components/user/Newsletter';
import Testimonials from '@/components/user/Testimonials';

// Mock promotion products data
const mockPromotionProducts = [
  {
    id: 1,
    name: 'Nike Air Max 270 React',
    brand: 'Nike',
    price: 2599000,
    originalPrice: 3199000,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    category: 'Thể thao',
    colors: [
      { name: 'Đen', value: '#000000' },
      { name: 'Trắng', value: '#FFFFFF' },
      { name: 'Cam', value: '#FF6B35' },
      { name: 'Xanh dương', value: '#3B82F6' },
    ],
    rating: 4.8,
    discount: 19,
    isHot: true,
  },
  {
    id: 2,
    name: 'Adidas Ultraboost 22',
    brand: 'Adidas',
    price: 2799000,
    originalPrice: 3899000,
    image: 'https://images.pexels.com/photos/1670766/pexels-photo-1670766.jpeg',
    category: 'Thể thao',
    colors: [
      { name: 'Đen', value: '#1F2937' },
      { name: 'Đỏ', value: '#EF4444' },
      { name: 'Xanh lá', value: '#10B981' },
      { name: 'Tím', value: '#8B5CF6' },
    ],
    rating: 4.9,
    discount: 28,
    badge: 'Mới',
  },
  {
    id: 3,
    name: 'Converse Chuck Taylor All Star',
    brand: 'Converse',
    price: 1199000,
    originalPrice: 1599000,
    image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg',
    category: 'Casual',
    colors: [
      { name: 'Đen', value: '#000000' },
      { name: 'Trắng', value: '#FFFFFF' },
      { name: 'Đỏ', value: '#DC2626' },
      { name: 'Xanh dương', value: '#1D4ED8' },
    ],
    rating: 4.6,
    discount: 25,
  },
  {
    id: 4,
    name: 'Vans Old Skool Classic',
    brand: 'Vans',
    price: 1349000,
    originalPrice: 1799000,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    category: 'Sneaker',
    colors: [
      { name: 'Đen', value: '#000000' },
      { name: 'Trắng', value: '#FFFFFF' },
      { name: 'Vàng', value: '#F59E0B' },
      { name: 'Xanh lá', value: '#059669' },
    ],
    rating: 4.7,
    discount: 25,
    isHot: true,
  },
  {
    id: 5,
    name: 'Puma RS-X Reinvention',
    brand: 'Puma',
    price: 1599000,
    originalPrice: 2299000,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    category: 'Sneaker',
    colors: [
      { name: 'Trắng', value: '#FFFFFF' },
      { name: 'Xanh dương', value: '#3B82F6' },
      { name: 'Cam', value: '#F97316' },
      { name: 'Tím', value: '#8B5CF6' },
    ],
    rating: 4.5,
    discount: 30,
  },
  {
    id: 6,
    name: 'New Balance 990v5',
    brand: 'New Balance',
    price: 3199000,
    originalPrice: 4299000,
    image: 'https://images.pexels.com/photos/1670766/pexels-photo-1670766.jpeg',
    category: 'Thể thao',
    colors: [
      { name: 'Xám', value: '#6B7280' },
      { name: 'Đen', value: '#000000' },
      { name: 'Xanh dương', value: '#1E40AF' },
    ],
    rating: 4.8,
    discount: 26,
  },
  {
    id: 7,
    name: 'Nike Air Force 1 Low',
    brand: 'Nike',
    price: 1759000,
    originalPrice: 2199000,
    image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg',
    category: 'Casual',
    colors: [
      { name: 'Trắng', value: '#FFFFFF' },
      { name: 'Đen', value: '#000000' },
      { name: 'Đỏ', value: '#EF4444' },
    ],
    rating: 4.9,
    discount: 20,
    badge: 'Bán chạy',
  },
  {
    id: 8,
    name: 'Adidas Stan Smith',
    brand: 'Adidas',
    price: 1379000,
    originalPrice: 1899000,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    category: 'Casual',
    colors: [
      { name: 'Trắng', value: '#FFFFFF' },
      { name: 'Xanh lá', value: '#10B981' },
    ],
    rating: 4.7,
    discount: 27,
  },
  {
    id: 9,
    name: 'Jordan Air 1 Mid',
    brand: 'Nike',
    price: 2999000,
    originalPrice: 3999000,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    category: 'Sneaker',
    colors: [
      { name: 'Đen', value: '#000000' },
      { name: 'Đỏ', value: '#DC2626' },
      { name: 'Trắng', value: '#FFFFFF' },
    ],
    rating: 4.9,
    discount: 25,
    isHot: true,
    badge: 'Limited',
  },
  {
    id: 10,
    name: 'Reebok Classic Leather',
    brand: 'Reebok',
    price: 1199000,
    originalPrice: 1699000,
    image: 'https://images.pexels.com/photos/1670766/pexels-photo-1670766.jpeg',
    category: 'Casual',
    colors: [
      { name: 'Trắng', value: '#FFFFFF' },
      { name: 'Đen', value: '#000000' },
      { name: 'Xanh dương', value: '#3B82F6' },
    ],
    rating: 4.4,
    discount: 29,
  },
];

const PromotionPage = () => {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    discountRange: [0, 100] as [number, number],
    sortBy: 'discount-desc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 8;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = mockPromotionProducts.filter((product) => {
      // Category filter
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);

      // Brand filter
      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);

      // Discount filter
      const matchesDiscount =
        product.discount >= filters.discountRange[0] &&
        product.discount <= filters.discountRange[1];

      return matchesCategory && matchesBrand && matchesDiscount;
    });

    // Sort products
    switch (filters.sortBy) {
      case 'discount-desc':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'discount-asc':
        filtered.sort((a, b) => a.discount - b.discount);
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Assuming products with 'Mới' badge are newest
        filtered.sort(
          (a, b) => (b.badge === 'Mới' ? 1 : 0) - (a.badge === 'Mới' ? 1 : 0)
        );
        break;
      case 'popular':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const breadcrumbItems = [{ label: 'Khuyến mãi' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <PromotionHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🔥 Khuyến Mãi Đặc Biệt
          </h1>
          <p className="text-gray-600">
            Cơ hội vàng sở hữu những đôi giày yêu thích với giá ưu đãi nhất
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <PromotionFilters
              filters={filters}
              onFiltersChange={setFilters}
              productCount={filteredProducts.length}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Hiển thị {paginatedProducts.length} trong số{' '}
                {filteredProducts.length} sản phẩm khuyến mãi
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sắp xếp:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-red-500 focus:border-red-500"
                >
                  <option value="discount-desc">Giảm giá cao nhất</option>
                  <option value="discount-asc">Giảm giá thấp nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="newest">Sản phẩm mới nhất</option>
                  <option value="popular">Bán chạy nhất</option>
                </select>
              </div>
            </div>

            <PromotionGrid products={paginatedProducts} loading={loading} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default PromotionPage;
