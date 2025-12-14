import AuthLayout from '@/layout/AuthLayout';
import RegisterPage from '@/pages/auth/RegisterPage';
import LoginPage from '@/pages/auth/LoginPage';
import ResetPage from '@/pages/auth/ResetPage';
import NotFound from '@/pages/error/NotFound';

export const authRoutes = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/reset', element: <ResetPage /> },
    ],
  },
  {
    path: '/*',
    element: <NotFound />,
  },
];
