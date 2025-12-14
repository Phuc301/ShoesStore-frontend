import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Navigate, useLocation } from 'react-router-dom';
import type { ProtectedRouteProps } from '@/interfaces/props/protectedRoute.props';

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();
  // Check if the user is authenticated
  if (!user || !user.isAuthenticated) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?ReturnUrl=${returnUrl}`} replace />;
  }
  // Check if the user has the required role
  if (requireAdmin && user.account?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
}
