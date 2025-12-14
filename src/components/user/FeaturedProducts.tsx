import { fetchProducts } from '@/api/product.api';
import type { Product } from '@/interfaces/admin/ProductManagement/product.interface';
import { formatCurrency } from '@/utils/formatCurrency.util';
import { ShoppingCart, Heart, Palette } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<number, string>
  >({});

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetchProducts({
        limit: 4,
        page: 1,
        sortBy: 4,
        isDeleted: 'false',
      });

      const defaultSelections: Record<number, string> = {};
      res.data.forEach((p: Product) => {
        if (p.variants && p.variants.length > 0) {
          defaultSelections[p.productId] = p.variants[0].sku || '';
        }
      });

      setProducts(res.data);
      setSelectedVariants(defaultSelections);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  const handleColorSelect = (productId: number, variantSku: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantSku,
    }));
  };

  const handleViewDetail = (product: Product) => {
    const selectedVariantSku =
      selectedVariants[product.productId] || product.variants?.[0]?.sku;

    // Navigate to the product detail page
    selectedVariantSku
      ? navigate(`/product-detail/${product.slug}?sku=${selectedVariantSku}`)
      : navigate(`/product-detail/${product.slug}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá những mẫu giày được yêu thích nhất từ các thương hiệu hàng
            đầu thế giới
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.imageProduct}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
                {/* {product.basePrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                    SALE
                  </div>
                )} */}
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-orange-500 font-semibold">
                    {product.brand}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>

                {/* Color Selection */}
                <div className="mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Palette className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Màu sắc:</span>
                  </div>
                  <div className="flex space-x-2">
                    {product.variants?.map((variant, index) => (
                      <button
                        key={index}
                        className={`w-6 h-6 rounded-full border-2 transition-colors relative group ${
                          selectedVariants[product.productId] === variant.sku
                            ? 'border-orange-500'
                            : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: variant.color }}
                        onClick={() =>
                          handleColorSelect(product.productId, variant.sku!)
                        }
                      >
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity whitespace-nowrap">
                          {variant.color}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-orange-500">
                      {formatCurrency(product.basePrice)}
                    </span>
                  </div>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2"
                  onClick={() => handleViewDetail(product)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Xem chi tiết</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => navigate('/product')}
          >
            Xem Tất Cả Sản Phẩm
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
