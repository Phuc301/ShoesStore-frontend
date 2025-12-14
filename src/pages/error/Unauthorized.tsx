import React from 'react';
import { Lock, LogIn, ArrowLeft, Shield, AlertTriangle } from 'lucide-react';

const Unauthorized: React.FC = () => {
  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 401 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-[12rem] font-bold text-red-400 opacity-20 leading-none">
              401
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-red-100">
                <Lock className="w-16 h-16 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Truy cập bị từ chối
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Bạn không có quyền truy cập vào trang này.
            </p>
            <p className="text-gray-500">
              Vui lòng đăng nhập hoặc liên hệ quản trị viên để được cấp quyền
              truy cập.
            </p>
          </div>

          {/* Warning Notice */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-auto max-w-md">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-red-800 mb-1">
                  Yêu cầu xác thực
                </h3>
                <p className="text-sm text-red-700">
                  Trang này yêu cầu bạn phải đăng nhập để truy cập.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleLogin}
              className="flex items-center space-x-2 bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <LogIn className="w-5 h-5" />
              <span>Đăng nhập</span>
            </button>

            <button
              onClick={handleGoBack}
              className="flex items-center space-x-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại</span>
            </button>
          </div>

          {/* Security Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                Bảo mật tài khoản
              </h3>
            </div>

            <div className="text-left space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  Trang này được bảo vệ để đảm bảo an toàn thông tin cá nhân của
                  bạn
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  Vui lòng đăng nhập bằng tài khoản có quyền truy cập hợp lệ
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Nếu bạn gặp vấn đề, hãy liên hệ với bộ phận hỗ trợ</p>
              </div>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
            <button
              onClick={handleGoHome}
              className="text-[#FF6B35] hover:text-orange-600 font-medium underline"
            >
              Về trang chủ
            </button>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a
              href="/forgot-password"
              className="text-[#FF6B35] hover:text-orange-600 font-medium underline"
            >
              Quên mật khẩu?
            </a>
            <span className="hidden sm:inline text-gray-400">•</span>
            <a
              href="/contact"
              className="text-[#FF6B35] hover:text-orange-600 font-medium underline"
            >
              Liên hệ hỗ trợ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
