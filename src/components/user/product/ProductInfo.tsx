import React, { useState } from 'react';
import { Star, Heart, Share2, ShoppingCart, Plus, Minus } from 'lucide-react';
import type { ProductInfoProps } from '@/interfaces/admin/ProductManagement/product.interface';
import Toast from '@/components/common/Toast';
import { useNavigate } from 'react-router-dom';
import type { CartItemParams } from '@/interfaces/cart.interface';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { addCartItem } from '@/api';
import { addToCart } from '@/store/slices/cart.slice';
import { formatCurrency } from '@/utils/formatCurrency.util';

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const cart = useSelector((state: RootState) => state.cart.shoppingCart);
  const dispatch = useDispatch();
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const navigate = useNavigate();
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      setToast({ message: 'Vui lòng chọn màu sắc và kích cỡ', type: 'error' });
      return;
    }
    const cartItem: CartItemParams[] = [
      {
        productId: product.id,
        sku: product.sku,
        price: product.price,
        quantity,
      },
    ];
    const response = await addCartItem(cart.cartId || 0, cartItem);
    if (response.success) {
      setToast({
        message: 'Sản phẩm đã được thêm vào giỏ hàng',
        type: 'success',
      });
      dispatch(
        addToCart({
          items: response.data,
          total: response.data.length,
        })
      );
    } else {
      setToast({
        message: 'Lỗi khi thêm sản phẩm vào giỏ hàng',
        type: 'error',
      });
    }
  };
  const handleBuyNow = async () => {
    if (!selectedColor || !selectedSize) {
      setToast({ message: 'Vui lòng chọn màu sắc và kích cỡ', type: 'error' });
      return;
    }
    const cartItem: CartItemParams[] = [
      {
        productId: product.id,
        sku: product.sku,
        price: product.price,
        quantity,
      },
    ];
    const response = await addCartItem(cart.cartId || 0, cartItem);
    if (!response.success) {
      setToast({
        message: 'Lỗi khi thêm sản phẩm vào giỏ hàng',
        type: 'error',
      });
      return;
    }
    dispatch(
      addToCart({
        items: response.data,
        total: response.data.length,
      })
    );
    navigate('/cart');
  };
  return (
    <div className="space-y-6">
      {/* Brand and Name */}
      <div>
        <p className="text-orange-500 font-semibold text-lg">{product.brand}</p>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">
          {product.name}
        </h1>
      </div>
      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        {product.reivewByUser > 0 ? (
          <>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-lg font-semibold text-gray-900 ml-2">
                {product.rating}
              </span>
            </div>
            <span className="text-gray-600">
              ({product.reivewByUser} đánh giá)
            </span>
          </>
        ) : (
          <span className="text-gray-500 italic">Chưa có đánh giá nào</span>
        )}
      </div>
      {/* Price */}
      <div className="flex items-center space-x-4">
        <span className="text-3xl font-bold text-orange-500">
          {formatCurrency(product.price)}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-xl text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          </>
        )}
      </div>
      {/* Badges */}
      {product.badges && product.badges.length > 0 && (
        <div className="flex space-x-2">
          {product.badges.map((badge, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                badge === 'Hot'
                  ? 'bg-red-100 text-red-600'
                  : badge === 'New'
                  ? 'bg-green-100 text-green-600'
                  : badge === 'Sale'
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
      )}
      {/* Description */}
      <p className="text-gray-600 leading-relaxed">{product.description}</p>
      {/* Color Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Màu sắc:{' '}
          <span className="text-orange-500">
            {selectedColor || 'Chưa chọn'}
          </span>
        </h3>
        <div className="flex space-x-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => color.available && onColorChange(color.name)}
              disabled={!color.available}
              className={`w-12 h-12 rounded-full border-2 transition-all ${
                selectedColor === color.name
                  ? 'border-orange-500 ring-2 ring-orange-200'
                  : color.available
                  ? 'border-gray-300 hover:border-gray-400'
                  : 'border-gray-200 opacity-50 cursor-not-allowed'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {color.value === '#FFFFFF' && (
                <div className="w-full h-full rounded-full border border-gray-200"></div>
              )}
              {!color.available && (
                <div className="w-full h-full rounded-full bg-gray-400/50 flex items-center justify-center">
                  <span className="text-white text-xs">×</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Size Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Kích thước:{' '}
          <span className="text-orange-500">{selectedSize || 'Chưa chọn'}</span>
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {product.sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => size.available && onSizeChange(size.value)}
              disabled={!size.available}
              className={`py-3 px-4 border-2 rounded-lg font-semibold transition-all ${
                selectedSize === size.value
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : size.available
                  ? 'border-gray-300 hover:border-gray-400 text-gray-700'
                  : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {size.value}
            </button>
          ))}
        </div>
      </div>
      {/* Quantity and Actions */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold text-gray-900">Số lượng:</span>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decreaseQuantity}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 font-semibold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Thêm vào giỏ</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2"
          >
            <span>Mua ngay</span>
          </button>
        </div>
        {/* <div className="flex space-x-4">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
              isFavorite
                ? 'border-red-300 bg-red-50 text-red-600'
                : 'border-gray-300 hover:border-gray-400 text-gray-700'
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            <span>Yêu thích</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 text-gray-700 transition-colors">
            <Share2 className="h-5 w-5" />
            <span>Chia sẻ</span>
          </button>
        </div> */}
      </div>
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ProductInfo;
