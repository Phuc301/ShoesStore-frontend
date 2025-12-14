import React from 'react';
import { Eye, EyeOff, Mail, Lock, User, Chrome } from 'lucide-react';
import SocialButton from './SocialButton';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSignInWithGoogle: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  handleInputChange,
  errors,
  showPassword,
  showConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  handleSubmit,
  handleSignInWithGoogle,
}) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký</h2>
        <p className="text-gray-600">Tạo tài khoản SoleStore mới</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
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
              placeholder="Nhập họ và tên của bạn"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-[#FF6B35]">{errors.fullName}</p>
          )}
        </div>
        {/* Email */}
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
              placeholder="Nhập email của bạn"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-[#FF6B35]">{errors.email}</p>
          )}
        </div>
        {/* Password */}
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
        {/* Confirm Password */}
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
        {/* Agree Terms */}
        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className={`h-4 w-4 mt-0.5 text-[#FF6B35] focus:ring-[#FF6B35] border-gray-300 rounded cursor-pointer ${
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
          className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
        >
          Đăng ký
        </button>
      </form>
      {/* Social */}
      <div className="mt-6 space-y-3">
        <SocialButton
          provider="Google"
          icon={<Chrome className="w-5 h-5" />}
          onClick={() => handleSignInWithGoogle()}
        />
      </div>

      <p className="text-center text-sm text-gray-600">
        Đã có tài khoản?{' '}
        <button
          onClick={() => navigate('/login')}
          className="text-[#FF6B35] hover:text-orange-600 font-medium transition-colors duration-200 cursor-pointer"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
