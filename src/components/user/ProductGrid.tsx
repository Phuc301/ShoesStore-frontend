import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Palette } from 'lucide-react';
import type { Product } from '@/interfaces/admin/ProductManagement/product.interface';
import { formatCurrency } from '@/utils/formatCurrency.util';
import { useNavigate } from 'react-router-dom';

interface ProductGridProps {
  products: Product[];
  selectedVariants: Record<number, string>;
  onVariantChange: (productId: number, sku: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedVariants,
  onVariantChange,
}) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };
  const handleViewDetail = (product: Product) => {
    const selectedVariantSku =
      selectedVariants[product.productId] || product.variants?.[0]?.sku;

    // Navigate to the product detail page
    selectedVariantSku
      ? navigate(`/product-detail/${product.slug}?sku=${selectedVariantSku}`)
      : navigate(`/product-detail/${product.slug}`);
  };

  const handleColorSelect = (productId: number, sku: string) => {
    onVariantChange(productId, sku);
  };
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">👟</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Không tìm thấy sản phẩm
        </h3>
        <p className="text-gray-600">
          Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.productId}
          className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="relative overflow-hidden">
            <img
              src={product.imageProduct}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              {false && (
                <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  MỚI
                </span>
              )}
              {false && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  SALE
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(product.productId)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${
                  favorites.includes(product.productId)
                    ? 'text-red-500 fill-current'
                    : 'text-gray-400'
                }`}
              />
            </button>
          </div>

          <div className="p-6">
            {/* Brand and Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-orange-500 font-semibold">
                {product.brand}
              </span>
              <div className="flex items-center space-x-1">
                <Star
                  className={`h-4 w-4 ${
                    product.averageRating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {product.averageRating !== 0
                    ? product.averageRating
                    : 'Chưa có đánh giá'}
                </span>
              </div>
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
                    key={variant.sku  + index.toString()}
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
  );
};

export default ProductGrid;
