import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  Eye,
  Check,
  X,
  MessageSquare,
} from 'lucide-react';

const ReviewManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const reviews = [
    {
      id: 1,
      customerName: 'John Doe',
      product: 'Nike Air Max 270',
      rating: 5,
      comment:
        'Excellent shoes! Very comfortable and stylish. Highly recommend to anyone looking for quality sneakers.',
      date: '2024-01-15',
      status: 'Approved',
      helpful: 12,
      images: [
        'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      ],
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      product: 'Adidas Ultra Boost',
      rating: 4,
      comment:
        'Good quality shoes. Fit is perfect and delivery was fast. Only minor issue is the price point.',
      date: '2024-01-14',
      status: 'Pending',
      helpful: 8,
      images: [],
    },
    {
      id: 3,
      customerName: 'Mike Johnson',
      product: 'Jordan 1 Retro',
      rating: 2,
      comment:
        'Not satisfied with the quality. The materials feel cheap and not worth the price.',
      date: '2024-01-13',
      status: 'Pending',
      helpful: 3,
      images: [],
    },
    {
      id: 4,
      customerName: 'Sarah Wilson',
      product: 'Converse Chuck Taylor',
      rating: 5,
      comment:
        'Classic design, great fit! These are my go-to casual shoes. Love them!',
      date: '2024-01-12',
      status: 'Approved',
      helpful: 15,
      images: [
        'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      ],
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const approveReview = (reviewId: number) => {
    console.log(`Approving review ${reviewId}`);
  };

  const rejectReview = (reviewId: number) => {
    console.log(`Rejecting review ${reviewId}`);
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === 'all' ||
      review.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Review Management</h1>
        <div className="text-sm text-gray-500">
          Total Reviews: {reviews.length}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer, product, or review content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-medium">
                    {review.customerName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {review.customerName}
                    </h3>
                    <span className="text-sm text-gray-500">reviewed</span>
                    <span className="text-sm font-medium text-gray-900">
                      {review.product}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    review.status === 'Approved'
                      ? 'bg-green-100 text-green-800'
                      : review.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {review.status}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </div>

            {review.images.length > 0 && (
              <div className="mb-4">
                <div className="flex space-x-2">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Review"
                      className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>{review.helpful} found helpful</span>
                </div>
              </div>

              {review.status === 'Pending' && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => rejectReview(review.id)}
                    className="flex items-center space-x-1 px-3 py-1 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => approveReview(review.id)}
                    className="flex items-center space-x-1 px-3 py-1 text-sm text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                </div>
              )}

              {review.status === 'Approved' && (
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Review Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-50 rounded-full">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {(
                  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                ).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-full">
              <Check className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {reviews.filter((r) => r.status === 'Approved').length}
              </p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-50 rounded-full">
              <MessageSquare className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {reviews.filter((r) => r.status === 'Pending').length}
              </p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-50 rounded-full">
              <Eye className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {reviews.reduce((sum, r) => sum + r.helpful, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Helpful</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewManagement;
