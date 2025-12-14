import React from 'react';
import { Star } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency.util';

interface TopProductProps {
  data: any[];
}

const TopProducts: React.FC<TopProductProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img
            src={item.product.imageProduct || '/default_product_img.png'}
            alt={item.product.productName}
            className="w-12 h-12 rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = '/default_product_img.png';
            }}
          />

          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-800">
              {item.product.productName}
            </h4>

            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-gray-500">
                {item.totalQuantity} đã bán
              </span>

              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-500 ml-1">
                  {item.product.averageRating}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">
              {formatCurrency(item.product.basePrice * item.totalQuantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopProducts;
