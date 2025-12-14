import { getCookie } from '@/utils/cookies.util';
import axios from '../utils/axiosCustomize.util';
import type { CartItemParams } from '@/interfaces/cart.interface';

export const createCart = async (): Promise<any> => {
  const response = await axios.post(
    '/cart/create',
    {},
    { withCredentials: true }
  );
  return response;
};

export const getCartByUser = async (): Promise<any> => {
  const response = await axios.get('/cart/by-user');
  return response;
};

export const getCartBySession = async (): Promise<any> => {
  const sessionId = getCookie('sessionId');
  if (!sessionId) {
    return null;
  }
  const response = await axios.get('/cart/by-session', {
    headers: { 'x-session-id': sessionId },
  });
  return response;
};

export const addCartItem = async (
  cartId: number,
  params: CartItemParams[]
): Promise<any> => {
  const response = await axios.post(`/cart-item/add/${cartId}`, params);
  return response;
};

export const countCartItem = async (cartId: number): Promise<any> => {
  const response = await axios.get(`/cart-item/count/${cartId}`);
  return response;
};

export const getCartItem = async (cartId: number): Promise<any> => {
  const response = await axios.get(`/cart-item/get/${cartId}`);
  return response;
};

export const updateCartItem = async (
  cartId: number,
  item: CartItemParams
): Promise<any> => {
  const response = await axios.put(`/cart-item/update/${cartId}`, { item });
  return response;
};

export const removeCartItem = async (cartId: number): Promise<any> => {
  const response = await axios.delete(`/cart-item/remove/${cartId}`);
  return response;
};

export const meregCart = async (): Promise<any> => {
  const sessionId = getCookie('sessionId');
  const response = await axios.patch(
    '/cart/merge',
    {},
    {
      headers: {
        'x-session-id': sessionId,
      },
    }
  );
  return response;
};
