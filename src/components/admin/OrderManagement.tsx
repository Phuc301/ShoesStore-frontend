import React, { useState, useEffect } from 'react';
import Header from './OrderManagement/Header';
import SearchAndFilter from './OrderManagement/SearchAndFilter';
import OrdersTable from './OrderManagement/OrdersTable';
import Pagination from './Pagination';
import { Package, Eye, RotateCcw, X, MapPin, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency.util';
import { formatDate } from '@/utils/formatDate.util';
import { OrderStatusEnum } from '@/enums/orderStatus.enum';
import Loading from '../common/Loading';
import Toast from '../common/Toast';
import {
  Clock,
  Settings,
  CheckCircle,
  Truck,
  PackageCheck,
  XCircle,
  Undo,
  AlertTriangle,
  Layers,
} from 'lucide-react';

import { fetchOrderAdmin, updateStatus } from '@/api';
import type { OrderBrief, OrderDetail } from '@/interfaces/order.interface';
import { detailOrder, fetchOrder, fetchStatusCounts } from '@/api';

const OrderManagement: React.FC = () => {
  //main states
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(6);

  //supporting status order
  const statusOptions = [
    'Tất cả đơn hàng',
    'Pending',
    'Processing',
    'Confirmed',
    'Shipping',
    'Delivered',
    'Cancelled',
    'Returned',
    'Failed',
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-6 h-6 text-yellow-600" />;

      case 'processing':
        return <Settings className="w-6 h-6 text-blue-600" />;

      case 'confirmed':
        return <CheckCircle className="w-6 h-6 text-indigo-600" />;

      case 'shipping':
        return <Truck className="w-6 h-6 text-purple-600" />;

      case 'delivered':
        return <PackageCheck className="w-6 h-6 text-green-600" />;

      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-600" />;

      case 'returned':
        return <Undo className="w-6 h-6 text-orange-600" />;

      case 'failed':
        return <AlertTriangle className="w-6 h-6 text-gray-600" />;

      default:
        return <Layers className="w-6 h-6 text-gray-400" />; // "Tất cả trạng thái"
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';

      case 'processing':
        return 'bg-blue-100 text-blue-800';

      case 'confirmed':
        return 'bg-indigo-100 text-indigo-800';

      case 'shipping':
        return 'bg-purple-100 text-purple-800';

      case 'delivered':
        return 'bg-green-100 text-green-800';

      case 'cancelled':
        return 'bg-red-100 text-red-800';

      case 'returned':
        return 'bg-orange-100 text-orange-800';

      case 'failed':
        return 'bg-gray-200 text-gray-800';

      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  //filter states
  const [selectedStatus, setSelectedStatus] = useState('tất cả đơn hàng');
  const [dateFilter, setDateFilter] = useState<string>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const [statusCount, setStatusCount] = useState({
    pending: 0,
    processing: 0,
    confirmed: 0,
    shipping: 0,
    delivered: 0,
    cancelled: 0,
    returned: 0,
    failed: 0,
  });

  const loadOrders = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit,
        status:
          selectedStatus !== 'tất cả đơn hàng' ? selectedStatus : undefined,
        dateFilter,
        startDate,
        endDate,
      };

      const data = await fetchOrderAdmin(params);
      const status = await fetchStatusCounts();
      const orderList = data.data;

      setStatusCount(status.data);
      setOrdersData(orderList);
      setTotalItems(data.pagination.total || 0);
      setTotalPages(data.pagination.totalPages || 1);
      
    } catch (err: any) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [limit, selectedStatus, dateFilter, startDate, endDate]);

  useEffect(() => {
    loadOrders();
  }, [currentPage, limit, selectedStatus, dateFilter, startDate, endDate]);

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      setLoading(true);
      await updateStatus({ orderId, newStatus });
      await loadOrders();
      setToast({
        message: 'Cập nhật trạng thái thành công',
        type: 'success',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to toggle product status');
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="space-y-3">
      <div className="sticky top-0 z-50 bg-white shadow-sm space-y-4 px-4 py-2 rounded-xl">
        <Header totalOrders={totalItems} />

        <SearchAndFilter
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          statusOptions={statusOptions}
          statusCount={statusCount}
          onSelectStatus={setSelectedStatus}
          getStatusIcon={getStatusIcon}
          dateFilter={dateFilter}
          selectedStartDate={startDate}
          selectedEndDate={endDate}
          setDataFilter={setDateFilter}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        <div className="flex justify-between items-end px-6 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Hiển thị mỗi trang:</span>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="border rounded-md px-2 py-1 text-sm "
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">
              trong tổng số {totalItems}
            </span>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {!loading && !error && ordersData.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          Không tìm thấy đơn hàng nào.
        </p>
      )}

      {!loading && !error && ordersData.length > 0 && (
        <OrdersTable
          orders={ordersData}
          statusOptions={statusOptions}
          getStatusIcon={getStatusIcon}
          getStatusColor={getStatusColor}
          updateOrderStatus={handleUpdateStatus}
          onShowDetail={handleViewDetails}
        />
      )}

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
            </div>
          </div>
        </div>
      )}
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

export default OrderManagement;
