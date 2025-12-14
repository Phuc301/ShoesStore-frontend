export interface ProductReviewsProps {
  productId: number;
  averageRating: number;
  totalReviews: number;
  reviewByGuest: number;
  reviewByUser: number;
  ratingDistribution: { _id: number; count: number }[];
}
