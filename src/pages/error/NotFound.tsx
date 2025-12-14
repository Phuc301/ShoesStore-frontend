import React from 'react';
import { Home, Search, ArrowLeft, FileQuestion } from 'lucide-react';

const NotFound: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-[12rem] font-bold text-[#FF6B35] opacity-20 leading-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                <FileQuestion className="w-16 h-16 text-[#FF6B35]" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Trang không tồn tại
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
            </p>
            <p className="text-gray-500">
              Trang có thể đã được di chuyển, xóa hoặc bạn đã nhập sai địa chỉ.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGoHome}
              className="flex items-center space-x-2 bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <Home className="w-5 h-5" />
              <span>Về trang chủ</span>
            </button>

            <button
              onClick={handleGoBack}
              className="flex items-center space-x-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại</span>
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Có thể bạn đang tìm kiếm?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="/profile"
                className="text-[#FF6B35] hover:text-orange-600 font-medium py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Thông tin cá nhân
              </a>
              <a
                href="/settings"
                className="text-[#FF6B35] hover:text-orange-600 font-medium py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Cài đặt tài khoản
              </a>
              <a
                href="/orders"
                className="text-[#FF6B35] hover:text-orange-600 font-medium py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Đơn hàng của tôi
              </a>
              <a
                href="/help"
                className="text-[#FF6B35] hover:text-orange-600 font-medium py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                Trung tâm hỗ trợ
              </a>
            </div>
          </div>

          {/* Help Text */}
          <div className="text-sm text-gray-500 mt-8">
            <p>
              Nếu bạn cho rằng đây là lỗi, vui lòng{' '}
              <a
                href="/contact"
                className="text-[#FF6B35] hover:text-orange-600 font-medium underline"
              >
                liên hệ với chúng tôi
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
