import React from 'react';
import PromotionRow from './PromotionRow';

interface Promotion {
  id: number;
  name: string;
  code: string;
  discount: number;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  usedCount: number;
  maxUses: number | null;
}

interface VouchersTableProps {
  vouchers: any[];
  handleViewVoucher: (vouchers: any) => void;
  handleEditVoucher: (vouchers: any) => void;
  handleToggleStatus: (id: number) => void;
}

const VoucherTable: React.FC<VouchersTableProps> = ({
  vouchers,
  handleViewVoucher,
  handleEditVoucher,
  handleToggleStatus,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-3">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                'Mã khuyến mãi',
                'Mã',
                'Ưu đãi',
                'Hạn dùng',
                'Đã dùng',
                'Trạng thái',
                'Thao tác',
              ].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {vouchers.map((voucher) => (
              <PromotionRow
                key={voucher.voucherId}
                voucher={voucher}
                handleViewVoucher={handleViewVoucher}
                handleEditVoucher={handleEditVoucher}
                handleToggleStatus={handleToggleStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherTable;
