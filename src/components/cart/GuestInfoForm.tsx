import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { User } from 'lucide-react';
import type { GuestInfo, GuestInfoFormRef } from '@/interfaces/auth.interface';

interface GuestInfoFormProps {}

const GuestInfoForm = forwardRef<GuestInfoFormRef, GuestInfoFormProps>(
  ({}, ref) => {
    const [formData, setFormData] = useState<GuestInfo>({
      email: '',
      fullName: '',
      gender: '',
      dateOfBirth: '',
    });

    // Handle input change
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validation logic (clean & pure)
    const validateForm = () => {
      if (!formData.email) return false;
      if (!/\S+@\S+\.\S+/.test(formData.email)) return false;
      if (!formData.fullName) return false;
      if (!formData.gender) return false;
      if (!formData.dateOfBirth) return false;
      return true;
    };

    // Expose the form data and validate function
    useImperativeHandle(ref, () => ({
      validate: validateForm,
      data: formData,
    }));

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <User className="h-5 w-5 mr-2 text-orange-500" />
            Thông tin khách hàng
          </h3>
        </div>
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-base"
              placeholder="Địa chỉ email"
            />
          </div>
          {/* Full name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input-base"
              placeholder="Họ và tên"
            />
          </div>
          {/* Gender + Date of birth */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giới tính <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-base"
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ngày sinh <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className="input-base"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default GuestInfoForm;
