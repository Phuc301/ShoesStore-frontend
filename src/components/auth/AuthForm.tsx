import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Chrome,
  ChromeIcon,
} from 'lucide-react';
import SocialButton from './SocialButton';

interface AuthFormProps {
  authMode: 'login' | 'register' | 'reset';
  setAuthMode?: (mode: 'login' | 'register' | 'reset') => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ authMode, setAuthMode }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (authMode === 'register' && !formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (authMode !== 'reset') {
      if (!formData.password) {
        newErrors.password = 'Vui lòng nhập mật khẩu';
      } else if (authMode === 'register' && formData.password.length < 6) {
        newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      }

      if (authMode === 'register') {
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        if (!formData.agreeTerms) {
          newErrors.agreeTerms = 'Vui lòng đồng ý với điều khoản';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', authMode, formData);
      // Handle form submission
    }
  };

  const renderLoginForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng nhập</h2>
        <p className="text-gray-600">Chào mừng trở lại với SoleStore</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                errors.email
                  ? 'border-[#FF6B35] focus:ring-[#FF6B35] focus:border-[#FF6B35]'
                  : 'border-gray-300 focus:ring-[#FF6B35] focus:border-[#FF6B35]'
              }`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-[#FF6B35]">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                errors.password
                  ? 'border-[#FF6B35] focus:ring-[#FF6B35] focus:border-[#FF6B35]'
                  : 'border-gray-300 focus:ring-[#FF6B35] focus:border-[#FF6B35]'
              }`}
              placeholder="Nhập mật khẩu"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-[#FF6B35]">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="h-4 w-4 text-[#FF6B35] focus:ring-[#FF6B35] border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Ghi nhớ tôi</span>
          </label>
          <button
            type="button"
            onClick={() => setAuthMode?.('reset')}
            className="text-sm text-[#FF6B35] hover:text-orange-600 font-medium transition-colors duration-200"
          >
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
        >
          Đăng nhập
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Hoặc đăng nhập bằng
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <SocialButton
            provider="Google"
            icon={<ChromeIcon className="w-5 h-5" />}
            onClick={() => console.log('Login with Google')}
          />
          <SocialButton
            provider="Facebook"
            icon={
              <div className="w-5 h-5 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">
                f
              </div>
            }
            onClick={() => console.log('Login with Facebook')}
          />
        </div>
      </div>

      <p className="text-center text-sm text-gray-600">
        Chưa có tài khoản?{' '}
        <button
          onClick={() => setAuthMode?.('register')}
          className="text-[#FF6B35] hover:text-orange-600 font-medium transition-colors duration-200"
        >
          Đăng ký ngay
        </button>
      </p>
    </div>
  );

  const renderRegisterForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký</h2>
        <p className="text-gray-600">Tạo tài khoản SoleStore mới</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Họ và tên
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                errors.fullName
                  ? 'border-[#FF6B35] focus:ring-[#FF6B35] focus:border-[#FF6B35]'
                  : 'border-gray-300 focus:ring-[#FF6B35] focus:border-[#FF6B35]'
              }`}
              placeholder="Nguyễn Văn A"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-[#FF6B35]">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                errors.email
                  ? 'border-[#FF6B35] focus:ring-[#FF6B35] focus:border-[#FF6B35]'
                  : 'border-gray-300 focus:ring-[#FF6B35] focus:border-[#FF6B35]'
              }`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-[#FF6B35]">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                errors.password
                  ? 'border-[#FF6B35] focus:ring-[#FF6B35] focus:border-[#FF6B35]'
                  : 'border-gray-300 focus:ring-[#FF6B35] focus:border-[#FF6B35]'
              }`}
              placeholder="Tối thiểu 6 ký tự"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-[#FF6B35]">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                errors.confirmPassword
                  ? 'border-[#FF6B35] focus:ring-[#FF6B35] focus:border-[#FF6B35]'
                  : 'border-gray-300 focus:ring-[#FF6B35] focus:border-[#FF6B35]'
              }`}
              placeholder="Nhập lại mật khẩu"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-[#FF6B35]">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className={`h-4 w-4 mt-0.5 text-[#FF6B35] focus:ring-[#FF6B35] border-gray-300 rounded ${
                errors.agreeTerms ? 'border-[#FF6B35]' : ''
              }`}
            />
            <span className="ml-2 text-sm text-gray-600">
              Tôi đồng ý với{' '}
              <a
                href="#"
                className="text-[#FF6B35] hover:text-orange-600 font-medium"
              >
                điều khoản dịch vụ
              </a>{' '}
              và{' '}
              <a
                href="#"
                className="text-[#FF6B35] hover:text-orange-600 font-medium"
              >
                chính sách bảo mật
              </a>
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="mt-1 text-sm text-[#FF6B35]">{errors.agreeTerms}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
        >
          Đăng ký
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Hoặc đăng ký bằng
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <SocialButton
            provider="Google"
            icon={<Chrome className="w-5 h-5" />}
            onClick={() => console.log('Google login')}
          />
          <SocialButton
            provider="Facebook"
            icon={
              <div className="w-5 h-5 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">
                f
              </div>
            }
            onClick={() => console.log('Facebook login')}
          />
        </div>
      </div>

      <p className="text-center text-sm text-gray-600">
        Đã có tài khoản?{' '}
        <button
          onClick={() => setAuthMode?.('login')}
          className="text-[#FF6B35] hover:text-orange-600 font-medium transition-colors duration-200"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );

  const renderResetForm = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Đặt lại mật khẩu
        </h2>
        <p className="text-gray-600">
          Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
                errors.email
                  ? 'border-[#FF6B35] focus:ring-[#FF6B35] focus:border-[#FF6B35]'
                  : 'border-gray-300 focus:ring-[#FF6B35] focus:border-[#FF6B35]'
              }`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-[#FF6B35]">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
        >
          Gửi link đặt lại mật khẩu
        </button>
      </form>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Mail className="h-5 w-5 text-[#FF6B35]" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-orange-800">
              Kiểm tra email của bạn
            </h3>
            <div className="mt-2 text-sm text-orange-700">
              <p>
                Sau khi nhấn gửi, vui lòng kiểm tra hộp thư email (bao gồm cả
                thư mục spam) để nhận link đặt lại mật khẩu.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600">
        Nhớ lại mật khẩu?{' '}
        <button
          onClick={() => setAuthMode?.('login')}
          className="text-[#FF6B35] hover:text-orange-600 font-medium transition-colors duration-200"
        >
          Đăng nhập
        </button>
      </p>

      <p className="text-center text-sm text-gray-500">
        Hoặc{' '}
        <button
          onClick={() => setAuthMode?.('register')}
          className="text-[#FF6B35] hover:text-orange-600 font-medium transition-colors duration-200"
        >
          tạo tài khoản mới
        </button>
      </p>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto transition-all duration-300 ease-in-out">
      {authMode === 'login' && renderLoginForm()}
      {authMode === 'register' && renderRegisterForm()}
      {authMode === 'reset' && renderResetForm()}
    </div>
  );
};

export default AuthForm;
