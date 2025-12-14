import { useRoutes } from 'react-router-dom';
import { userRoutes } from './userRoutes';
import { adminRoutes } from './adminRoutes';
import { authRoutes } from './authRoutes';

export const AppRoutes = () => {
  const routes = [...userRoutes, ...adminRoutes, ...authRoutes];
  return useRoutes(routes);
};
