import React from 'react';
import { Eye, Edit, Trash2, Star } from 'lucide-react';
import type { Product } from '../../../interfaces/admin/ProductManagement/product.interface';
import { formatCurrency } from '@/utils/formatCurrency.util';
import { useEffect, useState } from 'react';

interface ProductRowProps {
  product: Product;
  categoryMap: Record<number, string>;
  handleViewDetail: (product: Product) => void;
  handleEditProduct: (product: Product) => void;
  handleToggleStatus: (id: number) => void;
}

export const useImageValidation = (url: string) => {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (!url) {
      setValid(false);
      return;
    }

    const img = new Image();
    img.src = url;
    img.onload = () => setValid(true);
    img.onerror = () => setValid(false);

    setTimeout(() => {
      if (!img.complete) setValid(false);
    }, 1000);
  }, [url]);

  return valid;
};

const calculateStock = (product: Product): number => {
  return (
    product.variants?.reduce((total, variant) => {
      if (!variant.sizes) return total;
      return (
        total + variant.sizes.reduce((sum, size) => sum + (size.stock || 0), 0)
      );
    }, 0) || 0
  );
};

const getStockStatus = (stock: number) => {
  if (stock >= 10) {
    return { label: 'Còn hàng', color: 'bg-green-100 text-green-800' };
  }
  if (stock > 1 && stock < 10) {
    return { label: 'Sắp hết hàng', color: 'bg-orange-100 text-orange-800' };
  }
  if (stock === 1) {
    return { label: 'Hết hàng', color: 'bg-red-100 text-red-800' };
  }
  return { label: 'Sắp về hàng', color: 'bg-gray-200 text-gray-700' };
};

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  categoryMap,
  handleViewDetail,
  handleEditProduct,
  handleToggleStatus,
}) => {
  const [showStock, setShowStock] = React.useState(false);

  const stock = calculateStock(product);
  const stockStatus = getStockStatus(stock);
  const isValidImage = useImageValidation(product.imageProduct);

  const status = stock > 0 ? 'Còn hàng' : 'Hết hàng';
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <img
            src={
              isValidImage ? product.imageProduct : '/default_product_img.png'
            }
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{product.name}</p>
            <p className="text-xs text-gray-500">
              Colors:{' '}
              {product.variants?.map((variant) => variant.color).join(', ') ||
                'N/A'}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-700 text-center">
        {categoryMap?.[Number(product.categoryId)] ?? 'Unknown'}
      </td>

      <td className="px-6 py-4 text-sm font-medium text-gray-900 text-center">
        {formatCurrency(product.basePrice)}
      </td>
      <td
        className="px-6 py-4 text-sm text-center cursor-pointer select-none"
        onClick={() => setShowStock((prev) => !prev)}
      >
        {showStock ? (
          <span className="font-semibold text-sm text-gray-700">
            {stock} đôi
          </span>
        ) : (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}
          >
            {stockStatus.label}
          </span>
        )}
      </td>

      <td className="px-6 py-4 text-sm text-gray-700 text-center">
        <div className="flex items-center justify-center gap-1">
          {product.averageRating === 0 ? (
            <span className="text-gray-500 italic">Chưa có đánh giá</span>
          ) : (
            <>
              <span>{product.averageRating}</span>
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
            </>
          )}
        </div>
      </td>

      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => handleViewDetail(product)}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEditProduct(product)}
            className="p-1 text-gray-400 hover:text-orange-500 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleToggleStatus(product.productId)}
            className="p-1 text-gray-400 hover:text-purple-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
