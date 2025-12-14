import axios from '../utils/axiosCustomize.util';

interface FetchReviewsParams {
  productId: number;
  isGuest: boolean;
  page?: number;
  limit?: number;
  sentiment?: string;
}
export const fetchReviewsByProduct = async ({
  productId,
  isGuest,
  page = 1,
  limit = 5,
  sentiment,
}: FetchReviewsParams): Promise<any> => {
  const response = await axios.get(`/review/product/${productId}`, {
    params: {
      isGuest,
      page,
      limit,
      ...(sentiment ? { sentiment } : {}),
    },
  });
  return response.data;
};
