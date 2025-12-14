export interface IReview {
  reviewId: number;
  productId: number;
  userId?: number;
  avatar?: string;
  userName?: string;
  guestName?: string;
  guestEmail?: string;
  rating?: number;
  sentiment?: string;
  title: string;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
  isGuest?: boolean;
}

export interface IReviewDetail {
  ratingDistribution: { [key: number]: number };
  totalReviews: number;
  averageRating: number;
}
