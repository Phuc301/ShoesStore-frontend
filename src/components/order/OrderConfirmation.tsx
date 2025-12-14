import { TabKeyProfile } from '@/enums/tabKeyProfile.enum';
import type { OrderItem } from '@/interfaces/order.interface';
import { ShoppingBag, CheckCircle, Eye, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const paymentMethod = searchParams.get('paymentMethod');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!orderId || !paymentMethod) {
      navigate('/', { replace: true });
    }
  }, [orderId, paymentMethod, navigate]);
  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.1);
  const discount = 50000;
  const total = subtotal + tax - discount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Cảm ơn bạn đã đặt hàng!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Đơn hàng của bạn đã được xác nhận.
          </p>
          <p className="text-lg">
            <span className="text-gray-600">Mã đơn hàng: </span>
            <span className="font-bold text-orange-500 text-xl">{orderId}</span>
          </p>
        </div>
      </section>

      {/* Order Summary */}
      {false && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Chi tiết đơn hàng
                </h2>
              </div>

              <div className="p-6">
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div
                      key={item.sku}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.productName}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-800 truncate">
                          {item.productName}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          {/* <span>Size: {item.size}</span> */}
                          <span>×{item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-800">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Tạm tính:</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Thuế (10%):</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-orange-500 border-t border-gray-200 pt-3">
                      <span>Tổng cộng:</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Next Steps */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Bước tiếp theo
            </h2>
            <p className="text-gray-600">
              Chúng tôi sẽ gửi email xác nhận và thông tin vận chuyển đến địa
              chỉ của bạn.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
              <ShoppingCart size={20} />
              <span onClick={() => navigate('/product')}>Tiếp tục mua sắm</span>
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200 flex items-center justify-center space-x-2">
              <Eye size={20} />
              <span
                onClick={() =>
                  navigate(
                    `/profile?tabkeyProfile=${TabKeyProfile.ORDER_HISTORY}`
                  )
                }
              >
                Xem đơn hàng của tôi
              </span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Xử lý đơn hàng
              </h3>
              <p className="text-gray-600 text-sm">
                Đơn hàng đang được chuẩn bị và đóng gói
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Vận chuyển</h3>
              <p className="text-gray-600 text-sm">
                Giao hàng trong 2-3 ngày làm việc
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Nhận hàng</h3>
              <p className="text-gray-600 text-sm">
                Kiểm tra và xác nhận đã nhận hàng
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderConfirmation;
