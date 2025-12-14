import {
  ERROR_CONFIG,
  type ErrorType,
} from '@/constants/error.order.constants';
import {
  XCircle,
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  Phone,
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OrderFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const errorParam = searchParams.get('errorType') as ErrorType | null;
  const errorType: ErrorType =
    errorParam && ERROR_CONFIG[errorParam] ? errorParam : 'system';
  const { icon, title, description } = ERROR_CONFIG[errorType];
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero / Failure Message */}
      <section className="bg-gradient-to-br from-red-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Đặt hàng không thành công
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Đã xảy ra sự cố khi xử lý đơn hàng của bạn.
          </p>
          <p className="text-lg text-gray-600">
            Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.
          </p>
        </div>
      </section>

      {/* Error Details */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden">
            <div className="px-6 py-4 bg-red-50 border-b border-red-200">
              <div className="flex items-center space-x-3">
                {icon}
                <h2 className="text-xl font-semibold text-red-800">{title}</h2>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 leading-relaxed">{description}</p>

              {errorType === 'payment' && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-2">
                    Gợi ý khắc phục:
                  </h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Kiểm tra số dư tài khoản</li>
                    <li>• Xác nhận thông tin thẻ chính xác</li>
                    <li>• Thử sử dụng phương thức thanh toán khác</li>
                    <li>• Liên hệ ngân hàng nếu vấn đề vẫn tiếp tục</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps / CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Bạn có thể làm gì tiếp theo?
            </h2>
            <p className="text-gray-600">
              Chúng tôi sẵn sàng hỗ trợ bạn hoàn tất đơn hàng.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => navigate('/cart')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
            >
              <RefreshCw size={20} />
              <span>Thử lại</span>
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span>Quay lại Giỏ hàng</span>
            </button>
          </div>

          {/* Support Options */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Cần hỗ trợ?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+84123456789"
                className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors"
              >
                <Phone size={18} />
                <span className="font-medium">Gọi: +84 123 456 789</span>
              </a>
              <span className="hidden sm:block text-gray-300">|</span>
              <a
                href="mailto:support@shopname.com"
                className="text-orange-500 hover:text-orange-600 transition-colors font-medium"
              >
                Email: support@soleshoes.com
              </a>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Thời gian hỗ trợ: 8:00 - 22:00 (Thứ 2 - Chủ nhật)
            </p>
          </div>

          {/* Additional Help */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Thử lại ngay</h3>
              <p className="text-gray-600 text-sm">
                Quay lại trang thanh toán và thử lại với thông tin mới
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ArrowLeft className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Kiểm tra giỏ hàng
              </h3>
              <p className="text-gray-600 text-sm">
                Xem lại sản phẩm và cập nhật thông tin nếu cần
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Liên hệ hỗ trợ
              </h3>
              <p className="text-gray-600 text-sm">
                Đội ngũ hỗ trợ sẵn sàng giúp bạn 24/7
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderFailed;
