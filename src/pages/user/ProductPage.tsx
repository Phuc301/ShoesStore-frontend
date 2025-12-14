import { useState, useEffect, useRef } from 'react';
import ProductSearch from '@/components/user/ProductSearch';
import ProductFilters from '@/components/user/ProductFilters';
import ProductGrid from '@/components/user/ProductGrid';
import Breadcrumb from '@/components/user/Breadcrumb';
import Pagination from '@/components/common/Pagination';
import { fetchProducts } from '@/api';
import type { Product } from '@/interfaces/admin/ProductManagement/product.interface';
import { SortProductOption } from '@/enums/sortProduct.enum';
import { useSearchParams } from 'react-router-dom';
import Loading from '@/components/common/Loading';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isInit = useRef(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<number, string>
  >({});

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    brands: [] as string[],
    categories: [] as string[],
    priceRange: [0, 5000000] as [number, number],
    colors: [] as string[],
  });
  const [sortBy, setSortBy] = useState<SortProductOption>(
    SortProductOption.None
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sortBy]);

  useEffect(() => {
    if (isInit.current) return;
    const params: Record<string, string> = {};
    if (searchTerm) params.search = searchTerm;
    if (filters.brands.length) params.brands = filters.brands.join(',');
    if (filters.categories.length)
      params.categories = filters.categories.join(',');
    if (filters.colors.length) params.colors = filters.colors.join(',');
    if (filters.priceRange[0] > 0)
      params.minPrice = String(filters.priceRange[0]);
    if (filters.priceRange[1] < 5000000)
      params.maxPrice = String(filters.priceRange[1]);
    if (sortBy !== SortProductOption.None) params.sortBy = String(sortBy);
    if (currentPage > 1) params.page = String(currentPage);

    setSearchParams(params);
  }, [filters, sortBy, searchTerm, currentPage, setSearchParams]);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const brands = searchParams.get('brands')?.split(',') || [];
    const categories = searchParams.get('categories')?.split(',') || [];
    const colors = searchParams.get('colors')?.split(',') || [];
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice')) || 5000000;
    const page = Number(searchParams.get('page')) || 1;
    const sort = Number(searchParams.get('sortBy')) || SortProductOption.None;

    setSearchTerm(search);
    setFilters({
      brands,
      categories,
      colors,
      priceRange: [minPrice, maxPrice],
    });
    setCurrentPage(page);
    setSortBy(sort);
    isInit.current = false;
  }, []);

  useEffect(() => {
    getProducts();
  }, [currentPage, sortBy, searchTerm, filters]);

  const getProducts = async () => {
    try {
      setShowLoading(true);
      const res = await fetchProducts({
        limit: productsPerPage,
        page: currentPage,
        search: searchTerm,
        category: filters.categories.join(','),
        brand: filters.brands.join(','),
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        sortBy: sortBy,
        isDeleted: 'false',
      });
      const defaultSelections: Record<number, string> = {};
      res.data.forEach((p: Product) => {
        if (p.variants && p.variants.length > 0) {
          defaultSelections[p.productId] = p.variants[0].sku || '';
        }
      });
      setTotalPages(res.pagination.totalPages);
      setTotalProduct(res.pagination.total);
      setProducts(res.data);
      setSelectedVariants(defaultSelections);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setShowLoading(false);
    }
  };

  const breadcrumbItems = [{ label: 'Sản phẩm' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tất cả sản phẩm
          </h1>
          <p className="text-gray-600">
            Khám phá bộ sưu tập giày thời trang và thể thao đa dạng
          </p>
        </div>

        <ProductSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              productCount={totalProduct}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Hiển thị {products.length} trong số {totalProduct} sản phẩm
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(Number(e.target.value))}
                className="select-base"
              >
                <option value={SortProductOption.None}>Sắp xếp theo</option>
                <option value={SortProductOption.PriceAsc}>
                  Giá: Thấp đến cao
                </option>
                <option value={SortProductOption.PriceDesc}>
                  Giá: Cao đến thấp
                </option>
                <option value={SortProductOption.NameAsc}>Tên A-Z</option>
                <option value={SortProductOption.RatingDesc}>
                  Đánh giá cao nhất
                </option>
              </select>
            </div>

            <ProductGrid
              products={products}
              selectedVariants={selectedVariants}
              onVariantChange={(productId, sku) =>
                setSelectedVariants((prev) => ({ ...prev, [productId]: sku }))
              }
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
      <Loading show={showLoading} />
    </div>
  );
};

export default ProductsPage;
