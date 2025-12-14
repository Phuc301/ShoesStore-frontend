import React, { useState } from 'react';
import {
  Star,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  Filter,
} from 'lucide-react';

interface PointTransaction {
  id: string;
  date: string;
  description: string;
  type: 'earned' | 'spent';
  points: number;
  balance: number;
  category: 'purchase' | 'review' | 'referral' | 'bonus' | 'redemption';
}

const PointsHistory: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'earned' | 'spent'>('all');
  const [dateFilter, setDateFilter] = useState('all');

  const pointsHistory: PointTransaction[] = [
    {
      id: '1',
      date: '2024-01-15',
      description: 'Mua hàng - Đơn hàng ORD-2024-001',
      type: 'earned',
      points: 125,
      balance: 2450,
      category: 'purchase',
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'Đổi voucher giảm giá 50.000đ',
      type: 'spent',
      points: 500,
      balance: 2325,
      category: 'redemption',
    },
    {
      id: '3',
      date: '2024-01-12',
      description: 'Viết đánh giá sản phẩm',
      type: 'earned',
      points: 50,
      balance: 2825,
      category: 'review',
    },
    {
      id: '4',
      date: '2024-01-10',
      description: 'Mua hàng - Đơn hàng ORD-2024-002',
      type: 'earned',
      points: 85,
      balance: 2775,
      category: 'purchase',
    },
    {
      id: '5',
      date: '2024-01-08',
      description: 'Giới thiệu bạn bè thành công',
      type: 'earned',
      points: 200,
      balance: 2690,
      category: 'referral',
    },
    {
      id: '6',
      date: '2024-01-05',
      description: 'Bonus sinh nhật',
      type: 'earned',
      points: 500,
      balance: 2490,
      category: 'bonus',
    },
    {
      id: '7',
      date: '2024-01-03',
      description: 'Đổi sản phẩm miễn phí',
      type: 'spent',
      points: 1000,
      balance: 1990,
      category: 'redemption',
    },
  ];

  const filteredHistory = pointsHistory.filter((transaction) => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const getCategoryIcon = (category: PointTransaction['category']) => {
    const icons = {
      purchase: '🛒',
      review: '⭐',
      referral: '👥',
      bonus: '🎁',
      redemption: '🎫',
    };
    return icons[category];
  };

  const getCategoryColor = (category: PointTransaction['category']) => {
    const colors = {
      purchase: 'text-blue-600',
      review: 'text-yellow-600',
      referral: 'text-purple-600',
      bonus: 'text-green-600',
      redemption: 'text-red-600',
    };
    return colors[category];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const totalEarned = pointsHistory
    .filter((t) => t.type === 'earned')
    .reduce((sum, t) => sum + t.points, 0);

  const totalSpent = pointsHistory
    .filter((t) => t.type === 'spent')
    .reduce((sum, t) => sum + t.points, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Star className="w-6 h-6 text-[#FF6B35] mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Lịch sử điểm tích lũy
            </h2>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#e55a2b] p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Tổng điểm hiện tại</p>
                <p className="text-2xl font-bold">{(2450).toLocaleString()}</p>
              </div>
              <Star className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Tổng điểm tích lũy</p>
                <p className="text-2xl font-bold">
                  {totalEarned.toLocaleString()}
                </p>
              </div>
              <ArrowUpCircle className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Tổng điểm đã sử dụng</p>
                <p className="text-2xl font-bold">
                  {totalSpent.toLocaleString()}
                </p>
              </div>
              <ArrowDownCircle className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm"
              >
                <option value="all">Tất cả giao dịch</option>
                <option value="earned">Điểm tích lũy</option>
                <option value="spent">Điểm đã sử dụng</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm"
            >
              <option value="all">Tất cả thời gian</option>
              <option value="thisMonth">Tháng này</option>
              <option value="lastMonth">Tháng trước</option>
              <option value="thisYear">Năm này</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-gray-200">
        {filteredHistory.map((transaction) => (
          <div
            key={transaction.id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                  <span className="text-lg">
                    {getCategoryIcon(transaction.category)}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {transaction.description}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                        transaction.category
                      )} bg-opacity-10`}
                    >
                      {transaction.type === 'earned' ? 'Tích lũy' : 'Sử dụng'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>

              <div className="text-right ml-4">
                <div
                  className={`flex items-center space-x-2 ${
                    transaction.type === 'earned'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'earned' ? (
                    <ArrowUpCircle className="w-4 h-4" />
                  ) : (
                    <ArrowDownCircle className="w-4 h-4" />
                  )}
                  <span className="font-semibold">
                    {transaction.type === 'earned' ? '+' : '-'}
                    {transaction.points.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Số dư: {transaction.balance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div className="p-8 text-center">
          <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Không có giao dịch nào phù hợp</p>
        </div>
      )}
    </div>
  );
};

export default PointsHistory;
