import React from 'react';
import { Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
}

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Sản phẩm tương tự
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {product.originalPrice && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                  SALE
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="mb-2">
                <span className="text-sm text-orange-500 font-semibold">
                  {product.brand}
                </span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h4>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-3">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{product.rating}</span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-orange-500">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2">
                <span className="text-sm">Xem chi tiết</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
