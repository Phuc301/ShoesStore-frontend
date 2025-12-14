import React, { useEffect, useState } from 'react';
import { Package, Eye, RotateCcw, X, MapPin, CreditCard } from 'lucide-react';
import { detailOrder, fetchOrder } from '@/api';
import { formatCurrency } from '@/utils/formatCurrency.util';
import { formatDate } from '@/utils/formatDate.util';
import { OrderStatusEnum } from '@/enums/orderStatus.enum';
import type { OrderBrief, OrderDetail } from '@/interfaces/order.interface';
import Loading from '../common/Loading';

const OrderHistory: React.FC = () => {
  useEffect(() => {
    getOwnOrder();
  }, []);
  // Get order
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [orders, setOrders] = useState<OrderBrief[]>([]);
  const [loading, setLoading] = useState(false);

  const getOwnOrder = async () => {
    try {
      setLoading(true);
      const response = await fetchOrder();
      setOrders(response.data.data);
    } catch {
    } finally {
      setLoading(false);
    }
  };
  const getStatusBadge = (status: OrderStatusEnum) => {
    const statusStyles: Record<OrderStatusEnum, string> = {
      pending: 'bg-gray-100 text-gray-800',
      processing: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipping: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      returned: 'bg-purple-100 text-purple-800',
      failed: 'bg-gray-200 text-gray-500',
    };
    const statusText: Record<OrderStatusEnum, string> = {
      pending: 'Chờ xử lý',
      processing: 'Đang xử lý',
      confirmed: 'Đã xác nhận',
      shipping: 'Đang giao',
      delivered: 'Đã giao',
      cancelled: 'Đã hủy',
      returned: 'Đã trả hàng',
      failed: 'Thất bại',
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
      >
        {statusText[status]}
      </span>
    );
  };
  const handleViewDetails = async (orderId: string) => {
    try {
      setLoading(true);
      const response = await detailOrder(orderId);
      const detail: OrderDetail = {
        ...response.data.order,
        items: response.data.items,
        payment: response.data.payment,
        address: response.data.address,
        statusHistory: response.data.statusHistory,
      };
      setSelectedOrder(detail);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Package className="w-6 h-6 text-[#FF6B35] mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Lịch sử đơn hàng
            </h2>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {order.orderId}
                    </h3>
                    {getStatusBadge(order.status as OrderStatusEnum)}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 space-y-1 sm:space-y-0 sm:space-x-4">
                    <span>Ngày đặt: {formatDate(order.createdAt)}</span>
                    <span className="hidden sm:block">•</span>
                    <span>{order.itemsCount} sản phẩm</span>
                    {/* {order.tracking && (
                      <>
                        <span className="hidden sm:block">•</span>
                        <span>Mã vận chuyển: {order.tracking}</span>
                      </>
                    )} */}
                  </div>
                  <div className="mt-2">
                    <span className="text-lg font-semibold text-[#FF6B35]">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                  <button
                    onClick={() => handleViewDetails(order.orderId)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Chi tiết</span>
                  </button>
                  {order.status === 'completed' && (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors">
                      <RotateCcw className="w-4 h-4" />
                      <span>Mua lại</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Bạn chưa có đơn hàng nào</p>
          </div>
        )}
      </div>
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-overlay flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Chi tiết đơn hàng
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedOrder.orderId}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6">
              {/* Order Status and Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Package className="w-5 h-5 text-[#FF6B35] mr-2" />
                    <h3 className="font-medium text-gray-900">
                      Trạng thái đơn hàng
                    </h3>
                  </div>
                  {getStatusBadge(selectedOrder.status as OrderStatusEnum)}
                  <p className="text-sm text-gray-600 mt-2">
                    Ngày đặt: {formatDate(selectedOrder.createdAt)}
                  </p>
                  {/* {selectedOrder.tracking && (
                    <p className="text-sm text-gray-600">
                      Mã vận chuyển:{' '}
                      <span className="font-mono">
                        {selectedOrder.tracking}
                      </span>
                    </p>
                  )} */}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 text-[#FF6B35] mr-2" />
                    <h3 className="font-medium text-gray-900">
                      Địa chỉ giao hàng
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {selectedOrder?.address ? (
                      <>
                        <span className="font-medium">
                          {selectedOrder.address.fullName}
                        </span>{' '}
                        — {selectedOrder.address.phone}
                        <br />
                        {`${selectedOrder.address.detailAddress}, ${selectedOrder.address.street}, ${selectedOrder.address.ward}, ${selectedOrder.address.district}, ${selectedOrder.address.province}`}
                      </>
                    ) : (
                      'Chưa có địa chỉ giao hàng'
                    )}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CreditCard className="w-5 h-5 text-[#FF6B35] mr-2" />
                    <h3 className="font-medium text-gray-900">
                      Phương thức thanh toán
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.payment?.method === 'vnpay'
                      ? 'VNPay'
                      : 'COD'}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Sản phẩm đã đặt
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items?.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <img
                        src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {item.productName}
                        </h4>
                        {item.sku && (
                          <p className="text-sm text-gray-600">{item.sku}</p>
                        )}
                        <p className="text-sm text-gray-600">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(item.price)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Tổng: {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tóm tắt đơn hàng
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="text-gray-900">
                      {formatCurrency(selectedOrder.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="text-gray-900">Miễn phí vận chuyển</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">
                        Tổng cộng:
                      </span>
                      <span className="font-semibold text-[#FF6B35] text-lg">
                        {formatCurrency(selectedOrder.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                {selectedOrder.status === OrderStatusEnum.DELIVERED && (
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors">
                    <RotateCcw className="w-4 h-4" />
                    <span>Mua lại</span>
                  </button>
                )}
                {/* {selectedOrder.tracking && (
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Truck className="w-4 h-4" />
                    <span>Theo dõi đơn hàng</span>
                  </button>
                )} */}
              </div>
            </div>
          </div>
        </div>
      )}
      <Loading show={loading} />
    </>
  );
};

export default OrderHistory;
