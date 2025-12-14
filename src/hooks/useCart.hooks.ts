import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export const useCart = () => {
  const shoppingCart = useSelector(
    (state: RootState) => state.cart.shoppingCart
  );

  return { shoppingCart };
};
