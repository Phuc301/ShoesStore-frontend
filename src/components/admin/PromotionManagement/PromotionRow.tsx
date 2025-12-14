import React from 'react';
import { Tag, Calendar, Percent, Edit, Trash2, Eye } from 'lucide-react';
import { formatNumber } from '@/utils/formatNumber.util';

interface VouchersRowProps {
  voucher: any;
  handleViewVoucher: (vouchers: any) => void;
  handleEditVoucher: (vouchers: any) => void;
  handleToggleStatus: (id: number) => void;
}

const PromotionRow: React.FC<VouchersRowProps> = ({
  voucher,
  handleViewVoucher,
  handleEditVoucher,
  handleToggleStatus,
}) => {
  return (
    <tr className="hover:bg-gray-50">
      {/* Promotion */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-50 rounded-lg">
            <Tag className="w-5 h-5 text-orange-500" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-900">{voucher.name}</p>
            <p className="text-sm text-gray-500">{voucher.discountType}</p>
          </div>
        </div>
      </td>

      {/* Code */}
      <td className="px-6 py-4">
        <span className="inline-flex px-2 py-1 text-xs font-mono bg-gray-100 text-gray-800 rounded">
          {voucher.code}
        </span>
      </td>

      {/* Discount */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-900">
            {voucher.discountType === 'percentage'
              ? voucher.discountValue
              : formatNumber(voucher.discountValue)}
            {voucher.discountType === 'percentage' ? '%' : ' đ'}
          </span>
        </div>
      </td>

      {/* Period */}
      <td className="px-6 py-4 text-sm text-gray-700">
        {voucher.startDate && voucher.endDate ? (
          <>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              {voucher.startDate}
            </div>
            <p className="text-gray-500">to {voucher.endDate}</p>
          </>
        ) : (
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            không giới hạn
          </div>
        )}
      </td>

      {/* Usage */}
      <td className="px-6 py-4">
        {voucher.usageLimit && voucher.usageLimit > 0 ? (
          <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            {/* Progress bar */}
            <div
              className="h-4 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(
                  (voucher.currentUsage / voucher.usageLimit) * 100,
                  100
                )}%`,
                backgroundColor:
                  voucher.currentUsage >= voucher.usageLimit
                    ? '#dc2626' 
                    : '#f97316', 
              }}
            ></div>

            {/* Text inside */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[11px] font-semibold text-black drop-shadow-sm">
                {voucher.currentUsage}/{voucher.usageLimit}
              </span>
            </div>
          </div>
        ) : (
          <p className="font-medium text-gray-800">
            {voucher.currentUsage ?? 0}
          </p>
        )}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {(() => {
          const now = new Date();
          const end = voucher.endDate ? new Date(voucher.endDate) : null;

          const isActive = voucher.isActive;
          const activeLabel = isActive ? 'Khả dụng' : 'Vô hiệu';
          const activeColor = isActive
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700';

          const isExpired = end && end < now;
          const dateLabel = isExpired ? 'Hết hạn' : 'Còn hạn';
          const dateColor = isExpired
            ? 'bg-red-100 text-red-700'
            : 'bg-green-100 text-green-700';

          return (
            <div className="flex flex-col gap-1">
              <span
                className={`px-1.5 py-0.5 text-[10px] font-medium rounded-md inline-block w-fit ${activeColor}`}
              >
                {activeLabel}
              </span>

              <span
                className={`px-1.5 py-0.5 text-[10px] font-medium rounded-md inline-block w-fit ${dateColor}`}
              >
                {dateLabel}
              </span>
            </div>
          );
        })()}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button className="p-1 text-gray-400 hover:text-orange-500 transition">
            <Eye
              onClick={() => handleViewVoucher(voucher)}
              className="w-4 h-4"
            />
          </button>
          <button className="p-1 text-gray-400 hover:text-orange-500 transition">
            <Edit
              onClick={() => handleEditVoucher(voucher)}
              className="w-4 h-4"
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PromotionRow;
