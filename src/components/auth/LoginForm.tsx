import React from 'react';
import { Eye, EyeOff, Mail, Lock, Chrome } from 'lucide-react';
import SocialButton from './SocialButton';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSignInWithGoogle: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  handleInputChange,
  errors,
  showPassword,
  setShowPassword,
  handleSubmit,
  handleSignInWithGoogle,
}) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng nhập</h2>
        <p className="text-gray-600">Chào mừng trở lại với SoleStore</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              className="h-4 w-4 text-[#FF6B35] focus:ring-[#FF6B35] border-gray-300 rounded cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-600">Ghi nhớ tôi</span>
          </label>
          <button
            type="button"
            onClick={() => navigate('/reset')}
            className="text-sm text-[#FF6B35] hover:text-orange-600 font-medium transition-colors duration-200 cursor-pointer"
          >
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
        >
          Đăng nhập
        </button>
      </form>

      {/* Social Login */}
      <div className="mt-6 space-y-3">
        <SocialButton
          provider="Google"
          icon={<Chrome className="w-5 h-5" />}
          onClick={() => handleSignInWithGoogle()}
        />
      </div>

      <p className="text-center text-sm text-gray-600">
        Chưa có tài khoản?{' '}
        <button
          onClick={() => navigate('/register')}
          className="text-[#FF6B35] hover:text-orange-600 font-medium transition-colors duration-200 cursor-pointer"
        >
          Đăng ký ngay
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
