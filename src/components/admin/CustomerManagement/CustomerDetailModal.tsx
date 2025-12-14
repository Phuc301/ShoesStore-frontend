import React, { useEffect, useState } from 'react';
import {
  X,
  Mail,
  Phone,
  MapPin,
  Gift,
  Calendar,
  ShoppingBag,
  DollarSign,
} from 'lucide-react';
import { formatDate } from '@/utils/formatDate.util';
import { formatNumber } from '@/utils/formatNumber.util';
import { formatCurrency } from '@/utils/formatCurrency.util';
import { getAddressByEmail } from '@/api';

interface CustomerDetailModalProps {
  open: boolean;
  onClose: () => void;
  customer: any | null;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  open,
  onClose,
  customer,
}) => {
  const [address, setAddress] = useState<any>(null);

  const loadAddress = async () => {
    if (!customer?.email) return;
    try {
      const res = await getAddressByEmail(customer.email);
      setAddress(res.data?.[0] || null);
    } catch (err) {
      console.error('Error loading address:', err);
    }
  };

  useEffect(() => {
    if (customer) loadAddress();
  }, [customer]);

  if (!open || !customer) return null;

  const fallbackName = (() => {
    const parts = customer.fullName.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const last = parts[parts.length - 1]?.[0] || '';
    return (first + last).toUpperCase();
  })();

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-6 max-h-[92vh] overflow-y-auto animate-fadeIn">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Thông tin khách hàng
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AVATAR */}
          <div className="flex flex-col items-center md:items-start">
            {customer.avatarUrl ? (
              <img
                src={customer.avatarUrl}
                alt={customer.fullName}
                onError={(e) => (e.currentTarget.src = '/default_avatar.png')}
                className="w-28 h-28 rounded-lg object-cover shadow"
              />
            ) : (
              <div className="w-28 h-28 rounded-lg bg-orange-100 flex items-center justify-center text-3xl font-bold text-orange-600 shadow">
                {fallbackName}
              </div>
            )}

            <p className="text-lg font-semibold mt-3">{customer.fullName}</p>
            <p className="text-sm text-gray-500">ID: {customer.userId}</p>
          </div>

          {/* INFO */}
          <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl border">
            <h3 className="font-semibold text-gray-700 mb-3">
              Thông tin liên hệ
            </h3>

            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{customer.email}</span>
              </div>

              {/* Date of Birth */}
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>
                  {customer.dateOfBirth
                    ? new Date(customer.dateOfBirth).toLocaleDateString('vi-VN')
                    : 'Chưa cập nhật'}
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{address?.phone || 'Chưa có'}</span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                <span>
                  {address
                    ? `${address.address}, ${address.ward}, ${address.district}, ${address.city}`
                    : 'Chưa có địa chỉ'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* POINTS + ORDERS */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {/* Loyalty Points */}
          <div className="p-4 rounded-xl bg-gray-50 border">
            <p className="font-medium text-gray-700 mb-2">Điểm tích lũy</p>
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-orange-500" />
              <span className="font-semibold">
                {formatNumber(customer.loyaltyPoints) || 0} điểm
              </span>
            </div>
          </div>

          {/* Total Orders */}
          <div className="p-4 rounded-xl bg-gray-50 border">
            <p className="font-medium text-gray-700 mb-2">Số đơn đã mua</p>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-500" />
              <span className="font-semibold">
                {(customer.loyaltyPoints / 100).toFixed(0)} đơn
              </span>
            </div>
          </div>

          {/* Total Spent */}
          <div className="p-4 rounded-xl bg-gray-50 border col-span-2">
            <p className="font-medium text-gray-700 mb-2">Tổng tiền đã mua</p>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-semibold">
                {formatCurrency(customer.loyaltyPoints * 10000)}
              </span>
            </div>
          </div>
        </div>

        {/* CREATED / UPDATED */}
        <div className="mt-8 bg-gray-50 p-4 rounded-xl border">
          <p className="text-sm text-gray-600">
            <strong>Ngày tạo:</strong> {formatDate(customer.createdAt)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Cập nhật gần nhất:</strong> {formatDate(customer.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailModal;
