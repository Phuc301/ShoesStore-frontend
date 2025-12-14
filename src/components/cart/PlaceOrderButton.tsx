import React from 'react';
import { ShoppingCart, Lock } from 'lucide-react';

interface PlaceOrderButtonProps {
  total: number;
  onPlaceOrder: () => void;
  disabled?: boolean;
}

const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = ({
  onPlaceOrder,
  disabled = false,
}) => {
  const handleClick = () => {
    try {
      onPlaceOrder();
    } finally {
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        {/* <div className="flex items-center justify-between text-lg font-semibold">
          <span className="text-gray-900">Order Total:</span>
          <span className="text-orange-500">{formatPrice(total)}</span>
        </div> */}

        <button
          onClick={handleClick}
          disabled={disabled}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
        >
          <>
            <ShoppingCart className="h-6 w-6" />
            <span>Đặt hàng</span>
          </>
        </button>

        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Lock className="h-4 w-4" />
          <span>Thanh toán an toàn được hỗ trợ bởi mã hóa SSL</span>
        </div>

        <div className="text-center text-xs text-gray-500">
          Bằng cách đặt hàng, bạn đồng ý với chúng tôi{' '}
          <a href="#" className="text-orange-500 hover:underline">
            Điều khoản dịch vụ
          </a>{' '}
          và{' '}
          <a href="#" className="text-orange-500 hover:underline">
            Chính sách bảo mật
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderButton;
