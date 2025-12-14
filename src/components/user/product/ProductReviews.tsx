import React, { useState } from 'react';
import { Star } from 'lucide-react';
import type { ProductReviewsProps } from '@/interfaces/props/productReviews.prop';
import { useAuth } from '@/hooks/userAuth.hooks';
import { useProductWS } from '@/hooks/useReviewProduct.hook';
import type { IReview } from '@/interfaces/review.interface';

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  averageRating,
  totalReviews,
  reviewByGuest = 0,
  reviewByUser = 0,
  ratingDistribution,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { isAuthenticated } = useAuth();
  const [newReview, setNewReview] = useState({
    guestName: '',
    guestEmail: '',
    rating: 5,
    title: '',
    content: '',
  });
  const [activeTab, setActiveTab] = useState('customer');
  const tabs = [
    { id: 'customer', label: `Khách đăng ký (${reviewByUser})` },
    { id: 'guest', label: `Khách vãng lai (${reviewByGuest})` },
  ];
  const { guestReviews, customerReviews, submitReview } =
    useProductWS(productId);
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<IReview> = {
      productId: Number(productId),
      title: newReview.title,
      comment: newReview.content,
      ...(!isAuthenticated && { guestEmail: newReview.guestEmail }),
      ...(!isAuthenticated && { guestName: newReview.guestName || 'Guest' }),
      rating: newReview.rating,
      ...(isAuthenticated && { rating: newReview.rating }),
    };
    submitReview(payload);
    setShowReviewForm(false);
    setNewReview({
      rating: 5,
      title: '',
      content: '',
      guestName: '',
      guestEmail: '',
    });
  };

  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return '';
    const date =
      typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('vi-VN');
  };

  const getSentiment = (sentiment: string) => {
    return (
      <div
        className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium
        ${
          sentiment === 'Positive'
            ? 'bg-green-100 text-green-700'
            : sentiment === 'Negative'
            ? 'bg-red-100 text-red-700'
            : 'bg-gray-100 text-gray-700'
        }`}
      >
        {sentiment === 'Positive'
          ? 'Tích cực'
          : sentiment === 'Negative'
          ? 'Tiêu cực'
          : 'Trung lập'}
      </div>
    );
  };
  return (
    <>
      {/* Rating Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Đánh giá sản phẩm
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-orange-500 mb-2">
              {averageRating > 0 && averageRating?.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">
              {reviewByUser > 0 ? reviewByUser : 'Chưa có'} đánh giá
            </p>
          </div>
          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              // Find count for this star
              const ratingCount =
                ratingDistribution.find((r) => r._id === rating)?.count || 0;
              const widthPercent = reviewByUser
                ? (ratingCount / reviewByUser) * 100
                : 0;

              return (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 w-8">
                    {rating}⭐
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${widthPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {ratingCount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Write Review Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Viết đánh giá
          </button>
        </div>
      </div>
      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">
            Viết đánh giá của bạn
          </h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Rating Selection when logged in */}
            {isAuthenticated && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đánh giá của bạn
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() =>
                        setNewReview((prev) => ({ ...prev, rating }))
                      }
                      className="p-1"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          rating <= newReview.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Guest */}
            {!isAuthenticated && (
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={newReview.guestName}
                    onChange={(e) =>
                      setNewReview((prev) => ({
                        ...prev,
                        guestName: e.target.value,
                      }))
                    }
                    className="w-full input-base"
                    placeholder="Nhập họ và tên của bạn"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ email
                  </label>
                  <input
                    type="email"
                    value={newReview.guestEmail}
                    onChange={(e) =>
                      setNewReview((prev) => ({
                        ...prev,
                        guestEmail: e.target.value,
                      }))
                    }
                    className="w-full input-base"
                    placeholder="Nhập email của bạn"
                    required
                  />
                </div>
              </div>
            )}
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề
              </label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full input-base"
                placeholder="Tóm tắt đánh giá của bạn"
                required
              />
            </div>
            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung đánh giá
              </label>
              <textarea
                value={newReview.content}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                rows={4}
                className="w-full input-base"
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                required
              />
            </div>
            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Gửi đánh giá
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Tab Headers */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'customer' && (
            <div className="space-y-8">
              {customerReviews.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Chưa có đánh giá nào
                </div>
              )}
              {/* Reviews List */}
              <div className="space-y-6">
                {customerReviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {review.avatar ? (
                          <img
                            src={review.avatar}
                            alt={review.userName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-semibold">
                              {review.userName?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">
                            {review.userName}
                          </h5>
                          <span className="text-sm text-gray-500">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating!
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {review.rating}/5
                          </span>
                        </div>

                        {/* Title */}
                        <h6 className="font-semibold text-gray-900 mb-2">
                          {review.title}
                        </h6>

                        {/* Content */}
                        <p className="text-gray-700 mb-4">{review.comment}</p>

                        {/* Review Images */}
                        {/* {review.images && review.images.length > 0 && (
                          <div className="flex space-x-2 mb-4">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Review image ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        )} */}

                        {/* Sentiment */}
                        {getSentiment(review.sentiment!)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'guest' && (
            <div className="space-y-8">
              {guestReviews.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Chưa có đánh giá nào
                </div>
              )}
              {/* Reviews List */}
              <div className="space-y-6">
                {guestReviews.map(
                  (review, index) => (
                    console.log(review),
                    (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm p-6"
                      >
                        <div className="flex items-start space-x-4">
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            {review.avatar ? (
                              <img
                                src={review.avatar}
                                alt={review.guestName}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-semibold">
                                  {review.guestName?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Review Content */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-semibold text-gray-900">
                                {review.guestName}
                              </h5>
                              <span className="text-sm text-gray-500">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                            {/* Title */}
                            <h6 className="font-semibold text-gray-900 mb-2">
                              {review.title}
                            </h6>

                            {/* Content */}
                            <p className="text-gray-700 mb-4">
                              {review.comment}
                            </p>

                            {/* Review Images */}
                            {/* {review.images && review.images.length > 0 && (
                          <div className="flex space-x-2 mb-4">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Review image ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        )} */}

                            {/* Sentiment */}
                            {getSentiment(review.sentiment!)}
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
