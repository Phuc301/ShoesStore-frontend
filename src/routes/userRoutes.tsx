import AppLayout from '@/layout/AppLayout';
import AboutPage from '@/pages/user/AboutPage';
import ContactPage from '@/pages/user/ContractPage';
import MultiImageUploadPreview from '@/pages/user/DemoPage';
import HomePage from '@/pages/user/HomePage';
import ProductDetailPage from '@/pages/user/ProductDetailPage';
import ProductsPage from '@/pages/user/ProductPage';
import ProfilePage from '@/pages/user/ProfilePage';
import PromotionPage from '@/pages/user/PromotionPage';
import ProtectedRoute from './protectedRoutes';
import CartPage from '@/pages/user/CartPage';
import OrderConfirmationPage from '@/pages/user/OrderConfirmationPage';
import OrderFailed from '@/components/order/OrderFailed';

export const userRoutes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/product', element: <ProductsPage /> },
      { path: '/promotion', element: <PromotionPage /> },
      { path: '/about-us', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/product-detail/:slug', element: <ProductDetailPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout-success', element: <OrderConfirmationPage /> },
      { path: '/checkout-fail', element: <OrderFailed /> },

      { path: '/demo-page', element: <MultiImageUploadPreview /> },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
