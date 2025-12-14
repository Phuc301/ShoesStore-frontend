import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Toast from '../common/Toast';
import { changePassword, setPasswordForSocialLogin } from '@/api';
import type { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { userSetHasPassword } from '@/store/slices/user.slice';
import { withPageLoading } from '@/hoc/withPageLoading';
import Loading from '../common/Loading';

const ChangePassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const hasPassword = useSelector(
    (state: RootState) => state.user.account.hasPassword
  );
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setToast({ message: 'Passwords do not match', type: 'error' });
      return;
    }
    try {
      setLoading(true);
      let data: any;
      if (hasPassword) {
        data = await changePassword({
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
      } else {
        data = await setPasswordForSocialLogin({
          newPassword: formData.newPassword,
        });
        if (data?.success) {
          dispatch(userSetHasPassword());
        }
      }
      if (data?.success) {
        setToast({ message: 'Đổi mật khẩu thành công', type: 'success' });
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setToast({
          message: 'Đổi mật khẩu không thành công',
          type: 'error',
        });
      }
    } catch (err) {
      setToast({ message: 'An error occurred', type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Lock className="w-6 h-6 text-[#FF6B35] mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">
          {hasPassword ? 'Đổi mật khẩu' : 'Đặt mật khẩu'}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md">
        {hasPassword && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <input
                type={showPassword.current ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword.current ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        )}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              type={showPassword.new ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword.new ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
          </p>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <input
              type={showPassword.confirm ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword.confirm ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#FF6B35] text-white py-2 px-4 rounded-lg hover:bg-[#e55a2b] transition-colors font-medium"
        >
          Cập nhật mật khẩu
        </button>
      </form>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Loading show={loading} />
    </div>
  );
};

export default withPageLoading(ChangePassword);
