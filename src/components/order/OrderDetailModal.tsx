import React from 'react';
import {
  X,
  Package,
  MapPin,
  Phone,
  User,
  Calendar,
  DollarSign,
} from 'lucide-react';

interface OrderDetailModalProps {
  order: {
    id: string;
    date: string;
    total: number;
    status: 'pending' | 'shipping' | 'delivered' | 'cancelled';
    items: {
      id: string;
      name: string;
      image: string;
      size: string;
      color: string;
      quantity: number;
      price: number;
    }[];
    shippingInfo: {
      name: string;
      address: string;
      phone: string;
    };
  };
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipping':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'shipping':
        return 'Đang giao';
      case 'delivered':
        return 'Đã giao';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Chi tiết đơn hàng
            </h2>
            <p className="text-gray-600">#{order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Ngày đặt hàng</p>
                <p className="font-semibold">{formatDate(order.date)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Package className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Trạng thái</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Sản phẩm đã đặt
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        Size: {item.size} | Màu: {item.color}
                      </p>
                      <p>Số lượng: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#FF6B35]">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Thông tin giao hàng
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Người nhận</p>
                  <p className="font-semibold">{order.shippingInfo.name}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Địa chỉ</p>
                  <p className="font-semibold">{order.shippingInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Số điện thoại</p>
                  <p className="font-semibold">{order.shippingInfo.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <span className="text-lg font-semibold text-gray-800">
                  Tổng cộng:
                </span>
              </div>
              <span className="text-xl font-bold text-[#FF6B35]">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>

          {/* Actions */}
          {order.status === 'pending' && (
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200">
                Hủy đơn hàng
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
