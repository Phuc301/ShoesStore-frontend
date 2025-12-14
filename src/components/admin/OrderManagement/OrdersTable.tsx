import React from 'react';
import OrderRow from './OrderRow';

interface OrdersTableProps {
  orders: any[];
  statusOptions: string[];
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
  updateOrderStatus: (id: string, newStatus: string) => void;
  onShowDetail: (orderId: string) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  statusOptions,
  getStatusIcon,
  getStatusColor,
  updateOrderStatus,
  onShowDetail
}) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-3">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {['Mã đơn hàng', 'Khách hàng', 'Tổng cộng', 'Số lượng', 'Trạng thái', 'Ngày tạo', 'Thao tác'].map((head) => (
              <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              statusOptions={statusOptions}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
              updateOrderStatus={updateOrderStatus}
              onShowDetail={onShowDetail}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrdersTable;
