import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Zap } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  colors: { name: string; value: string }[];
  rating: number;
  discount: number;
  badge?: string;
  isHot?: boolean;
}

interface PromotionGridProps {
  products: Product[];
  loading?: boolean;
}

const PromotionGrid: React.FC<PromotionGridProps> = ({ products, loading }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse"
          >
            <div className="w-full h-64 bg-gray-200"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">🏷️</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Không có sản phẩm khuyến mãi
        </h3>
        <p className="text-gray-600">Thử thay đổi bộ lọc hoặc quay lại sau</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-red-100"
        >
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                <Zap className="h-3 w-3" />
                <span>-{product.discount}%</span>
              </span>
              {product.isHot && (
                <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  HOT
                </span>
              )}
              {product.badge && (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${
                  favorites.includes(product.id)
                    ? 'text-red-500 fill-current'
                    : 'text-gray-400'
                }`}
              />
            </button>

            {/* Savings Badge */}
            <div className="absolute bottom-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
              Tiết kiệm {formatPrice(product.originalPrice - product.price)}
            </div>
          </div>

          <div className="p-6">
            {/* Brand and Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-red-500 font-semibold">
                {product.brand}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>
            </div>

            {/* Product Name */}
            <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
              {product.name}
            </h3>

            {/* Colors */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-600">Màu sắc:</span>
              </div>
              <div className="flex space-x-2">
                {product.colors.slice(0, 4).map((color, index) => (
                  <button
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-red-500 transition-colors relative group"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {color.value === '#FFFFFF' && (
                      <div className="w-full h-full rounded-full border border-gray-200"></div>
                    )}
                  </button>
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-gray-500 self-center">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-red-500">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              </div>
              <span className="text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                -{product.discount}%
              </span>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105">
              <ShoppingCart className="h-5 w-5" />
              <span>Thêm vào giỏ</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromotionGrid;
