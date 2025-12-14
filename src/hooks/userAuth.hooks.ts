import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export const useAuth = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.user.account);

  return { isAuthenticated, user };
};
