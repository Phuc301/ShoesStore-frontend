import { useEffect, useRef, useState } from 'react';
import type { IReview } from '@/interfaces/review.interface';
import { useAuth } from './userAuth.hooks';
import { fetchReviewsByProduct } from '@/api/review.api';

const WsMessageType = {
  ProductCommentByGuest: 'product_comment_by_guest',
  ProductCommnetAndRating: 'product_comment_and_rating',
  Auth: 'auth',
};

interface UseProductWSResult {
  guestReviews: IReview[];
  customerReviews: IReview[];
  submitReview: (review: Partial<IReview>) => void;
}

export const useProductWS = (productId: number): UseProductWSResult => {
  const wsRef = useRef<WebSocket | null>(null);
  const { isAuthenticated, user } = useAuth();
  const [guestReviews, setGuestReviews] = useState<IReview[]>([]);
  const [customerReviews, setCustomerReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8080/api/ws?productId=${productId}`
    );
    wsRef.current = ws;
    ws.onopen = () => {
      if (isAuthenticated) {
        ws.send(
          JSON.stringify({
            type: WsMessageType.Auth,
            payload: { token: user.access_token },
          })
        );
      }
      // console.log('WebSocket connected for product', productId);
    };
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const review: IReview = msg.payload.review;
        // console.log(msg);
        review.avatar = msg.payload.avatar;
        review.userName = msg.payload.userName;
        if (msg.type === WsMessageType.ProductCommentByGuest) {
          setGuestReviews((prev) => [review, ...prev]);
        } else if (msg.type === WsMessageType.ProductCommnetAndRating) {
          setCustomerReviews((prev) => [review, ...prev]);
        } else {
          // console.warn('Unknown WS message type:', msg.type);
        }
      } catch (err) {
        // console.error('Failed to parse WS message:', event.data, err);
      }
    };

    ws.onclose = () => {
      // console.log('WebSocket disconnected for product', productId);
    };

    ws.onerror = (err) => {
      // console.error('WebSocket error for product', productId, err);
    };

    return () => {
      ws.close();
    };
  }, [productId]);

  const loadReviews = async () => {
    try {
      const customerData = await fetchReviewsByProduct({
        productId,
        isGuest: false,
      });
      setCustomerReviews(customerData.reviews);

      const guestData = await fetchReviewsByProduct({
        productId,
        isGuest: true,
      });
      setGuestReviews(guestData.reviews);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const submitReview = (review: Partial<IReview>) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      // console.warn('WebSocket not connected. Review not sent.');
      return;
    }
    const payload: Partial<IReview> = {
      ...review,
      ...(isAuthenticated && {
        avatar: user?.avatarUrl,
        userName: user?.fullName,
      }),
      isGuest: !isAuthenticated,
      createdAt: new Date(),
    };

    wsRef.current.send(
      JSON.stringify({
        type: isAuthenticated
          ? WsMessageType.ProductCommnetAndRating
          : WsMessageType.ProductCommentByGuest,
        payload,
      })
    );
  };

  return { guestReviews, customerReviews, submitReview };
};
