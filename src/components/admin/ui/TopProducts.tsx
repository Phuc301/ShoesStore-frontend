import React from 'react';
import { Star } from 'lucide-react';

const TopProducts: React.FC = () => {
  const products = [
    {
      name: 'Nike Air Max 270',
      sales: 1247,
      revenue: '$187,050',
      rating: 4.8,
      image:
        'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      name: 'Adidas Ultra Boost',
      sales: 1156,
      revenue: '$173,400',
      rating: 4.7,
      image:
        'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      name: 'Jordan 1 Retro',
      sales: 987,
      revenue: '$148,050',
      rating: 4.9,
      image:
        'https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      name: 'Converse Chuck Taylor',
      sales: 876,
      revenue: '$87,600',
      rating: 4.6,
      image:
        'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
  ];

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-800">
              {product.name}
            </h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-gray-500">
                {product.sales} sales
              </span>
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-500 ml-1">
                  {product.rating}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">
              {product.revenue}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopProducts;
