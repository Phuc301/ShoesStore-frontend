import React, { useEffect, useState } from 'react';
import { ShoppingBag, Tag, Gift, Minus, Plus, X } from 'lucide-react';
import { useAuth } from '@/hooks/userAuth.hooks';
import type { CartItem } from '@/interfaces/cart.interface';
import { checkCodeValid, getAllVoucher } from '@/api';
import type { Voucher } from '@/interfaces/voucher.interface';
import { formatCurrency } from '@/utils/formatCurrency.util';
interface OrderSummaryProps {
  cartItems: CartItem[];
  setToast: (toast: { message: string; type: 'success' | 'error' }) => void;
  onQuantityChange: (itemId: number, quantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  onVoucherChange?: (
    voucher: { voucherId: number; code: string; discount: number } | null
  ) => void;
  onPointsChange?: (points: number) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  setToast,
  onQuantityChange,
  onRemoveItem,
  onVoucherChange,
  onPointsChange,
}) => {
  const { user } = useAuth();
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{
    voucherId: number;
    code: string;
    discount: number;
  } | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [pointsToRedeem, setPointsToRedeem] = useState(0);
  const [availablePoints] = useState(user.loyaltyPoints);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const voucherDiscount = appliedVoucher ? appliedVoucher.discount : 0;
  const pointsDiscount = pointsToRedeem * 1000;
  const totalDiscount = voucherDiscount + pointsDiscount;
  const tax = subtotal * 0.1;
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchVouchers();
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      setAppliedVoucher(null);
      setPointsToRedeem(0);
    }
  }, [cartItems]);

  useEffect(() => {
    if (onVoucherChange) {
      onVoucherChange(appliedVoucher);
    }
  }, [appliedVoucher]);

  useEffect(() => {
    if (onPointsChange) {
      onPointsChange(pointsToRedeem);
    }
  }, [pointsToRedeem]);

  const fetchVouchers = async () => {
    try {
      const res = await getAllVoucher();
      if (res?.success && res?.data) {
        setVouchers(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch vouchers:', err);
    }
  };

  const handleApplyVoucher = async () => {
    const voucher = vouchers.length > 0 && vouchers.find(
      (v) => v.code.toUpperCase() === voucherCode.toUpperCase() && v.isActive
    );
    const isValid = await checkCodeValid(voucherCode.toLowerCase());
    if (!voucher || !isValid.data) {
      setToast({ message: 'Mã giảm giá không hợp lệ', type: 'error' });
      return;
    }

    if (voucher.minOrderValue && subtotal < voucher.minOrderValue) {
      setToast({
        message: `Giá trị đơn hàng tối thiểu để áp dụng voucher là ${formatCurrency(
          voucher.minOrderValue
        )}`,
        type: 'error',
      });
      return;
    }

    let discount = 0;
    if (voucher.discountType === 'percentage') {
      discount = (subtotal * voucher.discountValue) / 100;
      if (voucher.maxDiscountValue) {
        discount = Math.min(discount, voucher.maxDiscountValue);
      }
    } else {
      discount = voucher.discountValue;
    }

    setAppliedVoucher({
      code: voucher.code,
      discount,
      voucherId: voucher.voucherId,
    });
    setVoucherCode('');
  };

  const handleRemoveVoucher = () => setAppliedVoucher(null);

  const handlePointsChange = (points: number) => {
    const maxPoints = Math.min(availablePoints, Math.floor(subtotal / 1000));
    setPointsToRedeem(Math.max(0, Math.min(points, maxPoints)));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
        <ShoppingBag className="h-5 w-5 mr-2 text-orange-500" />
        Tóm tắt đơn hàng
      </h3>
      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div
            key={item.cartItemId}
            className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg relative group"
          >
            <button
              onClick={() => onRemoveItem(item.cartItemId)}
              className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 shadow-lg"
              title="Remove item"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm">
                {item.name}
              </h4>
              <p className="text-sm text-gray-600">
                Kích thước: {item.size} | Màu sắc: {item.color}
              </p>
              <p className="text-sm font-semibold text-orange-500">
                {formatCurrency(item.price)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  onQuantityChange(item.cartItemId, item.quantity - 1)
                }
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <span className="w-8 text-center font-semibold">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  onQuantityChange(item.cartItemId, item.quantity + 1)
                }
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Voucher Section */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Tag className="h-5 w-5 text-orange-500" />
          <span className="font-semibold text-gray-900">Mã giảm giá</span>
        </div>

        {appliedVoucher ? (
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <span className="font-semibold text-green-700">
                {appliedVoucher.code}
              </span>
              <p className="text-sm text-green-600">
                -{formatCurrency(appliedVoucher.discount)}
              </p>
            </div>
            <button
              onClick={handleRemoveVoucher}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Xoá
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              placeholder="Enter voucher code"
              className="input-base"
            />
            <button
              onClick={handleApplyVoucher}
              disabled={!voucherCode.trim()}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-fit"
            >
              Áp dụng
            </button>
          </div>
        )}
      </div>

      {/* Points Section */}
      {isAuthenticated && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Gift className="h-5 w-5 text-orange-500" />
            <span className="font-semibold text-gray-900">Đổi điểm</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Available: {availablePoints} points (Max:{' '}
              {Math.min(availablePoints, Math.floor(subtotal / 1000))} điểm)
            </p>
            <div className="flex space-x-2">
              <input
                type="number"
                value={pointsToRedeem}
                onChange={(e) =>
                  handlePointsChange(parseInt(e.target.value) || 0)
                }
                min="0"
                max={Math.min(availablePoints, Math.floor(subtotal / 1000))}
                placeholder="Points to redeem"
                className="input-base"
              />
              <button
                onClick={() =>
                  handlePointsChange(
                    Math.min(availablePoints, Math.floor(subtotal / 1000))
                  )
                }
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors min-w-fit"
              >
                Tối đa
              </button>
            </div>
            {pointsToRedeem > 0 && (
              <p className="text-sm text-green-600">
                Điểm giảm giá : -{formatCurrency(pointsDiscount)}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Order Totals */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-gray-700">
          <span>Tổng phụ :</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {totalDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Giảm giá :</span>
            <span>-{formatCurrency(totalDiscount)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-700">
          <span>Thuế (10%):</span>
          <span>{formatCurrency(tax)}</span>
        </div>

        <div className="flex justify-between text-xl font-bold text-orange-500 pt-3 border-t border-gray-200">
          <span>Tổng cộng :</span>
          <span>{formatCurrency(subtotal + tax - totalDiscount)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
