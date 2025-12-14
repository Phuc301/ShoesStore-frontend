import AdminLayout from '@/layout/AdminLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import ProductManagementPage from '@/pages/admin/ProductManagementPage';
import OrderManagementPage from '@/pages/admin/OrderManagementPage';
import CustomerManagementPage from '@/pages/admin/CustomerManagementPage';
import PromotionManagementPage from '@/pages/admin/PromotionManagementPage';
import ReviewManagementPage from '@/pages/admin/ReviewManagementPage';
import SettingsPage from '@/pages/admin/SettingsPage';
import ProtectedRoute from './protectedRoutes';
import NotFound from '@/pages/error/NotFound';
import Unauthorized from '@/pages/error/Unauthorized';

export const adminRoutes = [
  {
    path: '/admin',
    element: (
      <ProtectedRoute requireAdmin>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'products', element: <ProductManagementPage /> },
      { path: 'orders', element: <OrderManagementPage /> },
      { path: 'customers', element: <CustomerManagementPage /> },
      { path: 'promotions', element: <PromotionManagementPage /> },
      { path: 'reviews', element: <ReviewManagementPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: [{ path: 'unauthorized', element: <Unauthorized /> }],
  },
];
