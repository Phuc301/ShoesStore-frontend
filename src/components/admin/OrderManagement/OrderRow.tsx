import React, { useEffect, useState, useRef } from 'react';
import { Eye, ChevronDown } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency.util';
import { formatDate } from '@/utils/formatDate.util';
import { fetchUserById } from '@/api/user.api';

interface OrderRowProps {
  order: any;
  statusOptions: string[];
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
  updateOrderStatus: (id: string, newStatus: string) => void;
  onShowDetail: (orderId: string) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({
  order,
  statusOptions,
  getStatusIcon,
  getStatusColor,
  updateOrderStatus,
  onShowDetail,
}) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mapStatusVN: Record<string, string> = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    confirmed: 'Đã xác nhận',
    shipping: 'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy',
    returned: 'Đã trả hàng',
    failed: 'Thất bại',
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetchUserById(order.userId);
        setUserInfo(res.data);
      } catch (err) {
        console.error('Error loading user:', err);
      }
    };
    loadUser();
  }, [order.userId]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusColor = getStatusColor(order.status);
  const statusIcon = getStatusIcon(order.status);

  return (
    <tr className="hover:bg-gray-50 relative">
      {/* Order ID */}
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {order.orderId}
      </td>

      {/* User Info */}
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-gray-900">
          {userInfo?.fullName || 'Đang tải...'}
        </p>
        <p className="text-sm text-gray-500">{userInfo?.email || '...'}</p>
      </td>

      {/* Total Amount */}
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {formatCurrency(order.totalAmount)}
      </td>

      {/* Items count */}
      <td className="px-6 py-4 text-sm text-gray-700">
        {order.itemsCount} đôi
      </td>

      {/* STATUS + DROPDOWN */}
      <td className="px-6 py-4 relative">
        <div className="relative inline-block" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown((prev) => !prev)}
            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusColor} hover:opacity-90 transition`}
          >
            {statusIcon}
            <span className="ml-1">
              {mapStatusVN[order.status.toLowerCase()] || order.status}
            </span>
            <ChevronDown className="w-3 h-3 ml-1 opacity-70" />
          </button>

          {openDropdown && (
            <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded shadow-md w-40">
              {statusOptions.slice(1).map((status) => {
                const lower = status.toLowerCase();
                return (
                  <button
                    key={status}
                    onClick={() => {
                      updateOrderStatus(order.orderId, lower);
                      setOpenDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 capitalize"
                  >
                    {mapStatusVN[lower] || lower}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </td>

      {/* Created At */}
      <td className="px-6 py-4 text-sm text-gray-700">
        {formatDate(order.createdAt)}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <button
          onClick={() => onShowDetail(order.orderId)}
          className="p-1 text-gray-400 hover:text-blue-500 transition"
        >
          <Eye className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
