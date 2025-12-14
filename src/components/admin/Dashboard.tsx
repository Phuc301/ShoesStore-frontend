import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  ShoppingCart,
  Users,
  DollarSign,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
} from 'lucide-react';

import SummaryCard from './Dashboard/SummaryCard';
import StatsCard from './Dashboard/StatsCard';
import DailyRevenueChart from './Dashboard/DailyRevenueChart';
import TopProducts from './Dashboard/TopProducts';
import RevenueChart from './Dashboard/RevenueChart';
import ProfitChart from './Dashboard/ProfitChart';
import OrdersChart from './Dashboard/OrdersChart';
import ProductsSoldChart from './Dashboard/ProductsSoldChart';
import ProductCategoryChart from './Dashboard/ProductCategoryChart';
import ComparisonChart from './Dashboard/ComparisonChart';
import GrowthChart from './Dashboard/GrowthChart';

import {
  fetchSummaryDashboard,
  fetchTopSelling,
  fetchDailyRevenue,
} from '@/api';

const Dashboard: React.FC = () => {
  const [dashboardView, setDashboardView] = useState<'simple' | 'advanced'>(
    'simple'
  );
  const [timeframe, setTimeframe] = useState('annually');

  const [summary, setSummary] = useState<any>({
    revenue: {
      totalRevenue: 0,
      current: 0,
      previous: 0,
      changePercent: 0,
    },
    orders: {
      totalOrders: 0,
      current: 0,
      previous: 0,
      changePercent: 0,
    },
    newCustomers: {
      current: 0,
      previous: 0,
      changePercent: 0,
    },
    totalCustomers: {
      current: 0,
      previous: 0,
      changePercent: 0,
    },
  });
  const [topSelling, setTopSelling] = useState<any[]>([]);
  const [dailyRevenue, setDailyRevenue] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  function getParamRevenue() {
    const today = new Date();

    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 1);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 7);

    const syear = startDate.getFullYear();
    const smonth = String(startDate.getMonth() + 1).padStart(2, '0');
    const sday = String(startDate.getDate()).padStart(2, '0');

    const eyear = endDate.getFullYear();
    const emonth = String(endDate.getMonth() + 1).padStart(2, '0');
    const eday = String(endDate.getDate()).padStart(2, '0');


    return {
      startDate: `${syear}-${smonth}-${sday}`,
      endDate: `${eyear}-${emonth}-${eday}`,
    };
  }

  const loadDashboardData = async () => {
    try {
      // setLoading(true);

      const paramDailyRevenue = getParamRevenue();

      const dailyRevenue = await fetchDailyRevenue(paramDailyRevenue);
      const summaryDashboard = await fetchSummaryDashboard();
      const topSelling = await fetchTopSelling();

      setSummary(summaryDashboard.data);
      setTopSelling(topSelling.data);
      setDailyRevenue(dailyRevenue);

    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const bestSellingProduct = {
    topProducts: [
      { name: 'Nike Air Max 270', sold: 1287, revenue: 115830 },
      { name: 'Adidas Ultraboost 22', sold: 982, revenue: 98320 },
      { name: 'MLB Chunky Liner White', sold: 754, revenue: 75400 },
      { name: 'Converse Chuck 70 High', sold: 689, revenue: 55120 },
      { name: 'Vans Old Skool Black', sold: 645, revenue: 38700 },
    ],
  };

  //mockdata for advanced
  const stats = {
    //statsWeekly, statsMonthly, statsQuarter, statsAnnually
    orders: 1176,
    revenue: 73920,
    profit: 19438,
    avgOrderValue: 62.88,
  };

  const revenue = {
    data: [
      { label: 'Week 1', value: 18120 },
      { label: 'Week 2', value: 19480 },
      { label: 'Week 3', value: 18290 },
      { label: 'Week 4', value: 18030 },
    ],
  };

  const profit = {
    data: [
      { label: 'Week 1', value: 4920 },
      { label: 'Week 2', value: 5140 },
      { label: 'Week 3', value: 4640 },
      { label: 'Week 4', value: 4738 },
    ],
  };

  const orders = {
    data: [
      { label: 'Week 1', orders: 294 },
      { label: 'Week 2', orders: 302 },
      { label: 'Week 3', orders: 286 },
      { label: 'Week 4', orders: 294 },
    ],
  };

  const productSold = {
    data: [
      { label: 'Week 1', productsSold: 610 },
      { label: 'Week 2', productsSold: 650 },
      { label: 'Week 3', productsSold: 595 },
      { label: 'Week 4', productsSold: 620 },
    ],
  };

  const categoryBreakdown = {
    categories: [
      { label: 'Sneakers', value: 42 },
      { label: 'Sandals', value: 18 },
      { label: 'Boots', value: 13 },
      { label: 'Slip-ons', value: 10 },
      { label: 'Running Shoes', value: 17 },
      { label: 'Basketball Shoes', value: 8 },
      { label: 'Canvas', value: 11 },
    ],
  };

  const comparison = {
    current: [
      { label: 'Week 1', revenue: 18120, profit: 4920, orders: 294 },
      { label: 'Week 2', revenue: 19480, profit: 5140, orders: 302 },
      { label: 'Week 3', revenue: 18290, profit: 4640, orders: 286 },
      { label: 'Week 4', revenue: 18030, profit: 4738, orders: 294 },
    ],
    previous: [
      { label: 'Week 1', revenue: 16120, profit: 4420, orders: 270 },
      { label: 'Week 2', revenue: 17480, profit: 4740, orders: 288 },
      { label: 'Week 3', revenue: 16290, profit: 4240, orders: 260 },
      { label: 'Week 4', revenue: 16030, profit: 4330, orders: 265 },
    ],
  };

  const growth = {
    ordersGrowth: [
      { day: 'Mon', growth: 9.8 },
      { day: 'Tue', growth: 10.6 },
      { day: 'Wed', growth: 9.1 },
      { day: 'Thu', growth: 8.9 },
      { day: 'Fri', growth: 9.4 },
      { day: 'Sat', growth: 10.8 },
      { day: 'Sun', growth: 9.5 },
    ],
    revenueGrowth: [
      { day: 'Mon', growth: 11.6 },
      { day: 'Tue', growth: 10.9 },
      { day: 'Wed', growth: 10.1 },
      { day: 'Thu', growth: 10.5 },
      { day: 'Fri', growth: 9.7 },
      { day: 'Sat', growth: 10.6 },
      { day: 'Sun', growth: 10.4 },
    ],
    productsGrowth: [
      { day: 'Mon', growth: 8.5 },
      { day: 'Tue', growth: 10.1 },
      { day: 'Wed', growth: 8.2 },
      { day: 'Thu', growth: 9.5 },
      { day: 'Fri', growth: 10.2 },
      { day: 'Sat', growth: 9.8 },
      { day: 'Sun', growth: 10.1 },
    ],
  };

  // Advanced Stats Mock
  const statsMock = {
    monthly: {
      orders: 1176,
      revenue: 73920,
      profit: 19438,
      avgOrderValue: 62.88,
    },
    weekly: { orders: 294, revenue: 18520, profit: 4798, avgOrderValue: 62.99 },
    quarterly: {
      orders: 3842,
      revenue: 241870,
      profit: 63510,
      avgOrderValue: 62.96,
    },
    annually: {
      orders: 14209,
      revenue: 894320,
      profit: 236580,
      avgOrderValue: 62.93,
    },
  };

  const getAdvancedStats = () => {
    const current = statsMock[timeframe as keyof typeof statsMock];
    return [
      {
        title: 'Orders Sold',
        value: current.orders,
        change: '+14%',
        changeType: 'positive' as const,
        icon: ShoppingCart,
      },
      {
        title: 'Total Revenue',
        value: `$${current.revenue.toLocaleString()}`,
        change: '+20%',
        changeType: 'positive' as const,
        icon: DollarSign,
      },
      {
        title: 'Total Profit',
        value: `$${current.profit.toLocaleString()}`,
        change: '+18%',
        changeType: 'positive' as const,
        icon: TrendingUp,
      },
      {
        title: 'Avg Order Value',
        value: `$${current.avgOrderValue}`,
        change: '+6%',
        changeType: 'positive' as const,
        icon: BarChart3,
      },
    ];
  };

  const simpleStats = [
    {
      title: 'Tổng số khách hàng',
      value: '32,840',
      change: '+18%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Khách hàng mới',
      value: '2,431',
      change: '+9%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Tổng số đơn hàng',
      value: '14,209',
      change: '+22%',
      changeType: 'positive' as const,
      icon: ShoppingCart,
    },
    {
      title: 'Doanh thu',
      value: '$894,320',
      change: '+31%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
  ];

  // Simple Dashboard
  const renderSimpleDashboard = () => (
    <div className="space-y-8">
      <SummaryCard data={summary} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-gray-900">
              Doanh thu gần đây
            </h3>
            <div className="p-2 bg-orange-50 rounded-full">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <DailyRevenueChart data={dailyRevenue} />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-gray-900">
              Sản phẩm bán chạy
            </h3>
            <div className="p-2 bg-blue-50 rounded-full">
              <ShoppingBag className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <TopProducts data={topSelling} />
        </div>
      </div>
    </div>
  );

  // Advanced Dashboard
  const renderAdvancedDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">
            Khung thời gian:
          </label>

          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="weekly">Hàng tuần</option>
            <option value="monthly">Hàng tháng</option>
            <option value="quarterly">Hàng quý</option>
            <option value="annually">Hàng năm</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getAdvancedStats().map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Doang thu</h3>
          <RevenueChart timeframe={timeframe} />
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Lợi nhuận</h3>
          <ProfitChart timeframe={timeframe} />
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Số đơn hàng</h3>
          <OrdersChart timeframe={timeframe} />
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Sản phẩm đã bán</h3>
          <ProductsSoldChart timeframe={timeframe} />
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Danh mục sản phẩm</h3>
          <ProductCategoryChart data={categoryBreakdown.categories} />
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-6">So sánh tổng quát</h3>
        <ComparisonChart timeframe={timeframe} />
        {/* <ComparisonChart
          current={comparison.current}
          previous={comparison.previous}
        /> */}

        <GrowthChart
          ordersGrowth={growth.ordersGrowth}
          revenueGrowth={growth.revenueGrowth}
          productsGrowth={growth.productsGrowth}
        />
      </div>
    </div>
  );

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-50 bg-white shadow-sm space-y-4 px-4 py-2 rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

          <div className="flex items-center bg-gray-100 rounded-lg p-1 space-x-2">
            <button
              onClick={() => setDashboardView('simple')}
              className={`px-4 py-2 text-sm rounded-md ${
                dashboardView === 'simple'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Cơ bản
            </button>

            <button
              onClick={() => setDashboardView('advanced')}
              className={`px-4 py-2 text-sm rounded-md ${
                dashboardView === 'advanced'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Chuyên sâu
            </button>
          </div>
        </div>
      </div>

      {dashboardView === 'simple'
        ? renderSimpleDashboard()
        : renderAdvancedDashboard()}
    </div>
  );
};

export default Dashboard;
