import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import {
  createCart,
  getCartByUser,
  getCartBySession,
  countCartItem,
} from '@/api';
import { getCookie } from '@/utils/cookies.util';
import { addToCart, setCartId } from '@/store/slices/cart.slice';

export const useCartInit = () => {
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      if (cart.shoppingCart.cartId) return;
      try {
        const cookie = getCookie('sessionId');
        let response = null;

        if (!user.isAuthenticated && !cookie) {
          try {
            response = await createCart();
          } catch {
            response = await getCartBySession();
          }
        } else if (user.isAuthenticated) {
          response = await getCartByUser();
        } else {
          response = await getCartBySession();
        }

        if (response?.data?.cartId) {
          dispatch(setCartId({ cartId: response.data.cartId }));
          // Count the number of items in the cart
          const countResponse = await countCartItem(response?.data?.cartId);
          if (countResponse?.data) {
            dispatch(addToCart({ total: countResponse.data }));
          }
        }
      } catch (error) {
        console.error('Failed to initialize cart:', error);
      }
    };

    fetchCart();
  }, [user.isAuthenticated, cart.shoppingCart.cartId]);
};
