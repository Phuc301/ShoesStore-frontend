import React, { useState } from 'react';
import { Edit3, Save, User, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import Toast from '../common/Toast';
import { updateProfile } from '@/api';
import { userUpdate } from '@/store/slices/user.slice';
import Loading from '../common/Loading';
import { withPageLoading } from '@/hoc/withPageLoading';

const PersonalInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    name: user.account.fullName,
    email: user.account.email,
    dateOfBirth: user.account.dateOfBirth || '',
    gender: user.account.sex || '',
  });
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const data = await updateProfile({
        fullName: formData.name,
        dateOfBirth: formData.dateOfBirth
          ? new Date(formData.dateOfBirth).toISOString()
          : null,
        sex: formData.gender || null,
      });
      if (data.success) {
        dispatch(userUpdate({ ...data.data }));
        setToast({ message: 'Profile updated successfully', type: 'success' });
      } else {
        setToast({ message: data.message || 'Update failed', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'An error occurred', type: 'error' });
    } finally {
      setIsEditing(false);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user.account.fullName,
      email: user.account.email,
      dateOfBirth: user.account.dateOfBirth || '',
      gender: user.account.sex || '',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center mb-6">
          <User className="w-6 h-6 text-[#FF6B35] mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">
            Thông tin cá nhân
          </h2>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>Chỉnh sửa</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Lưu</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Hủy</span>
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Họ và tên
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent disabled:bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giới tính
          </label>
          <select
            name="gender"
            value={formData.gender || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent disabled:bg-gray-50"
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngày sinh
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={
              formData.dateOfBirth
                ? new Date(formData.dateOfBirth).toISOString().split('T')[0]
                : ''
            }
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent disabled:bg-gray-50"
          />
        </div>
      </div>
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

export default withPageLoading(PersonalInfo);
