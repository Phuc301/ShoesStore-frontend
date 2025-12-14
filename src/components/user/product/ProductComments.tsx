import React, { useState } from 'react';
import { MessageCircle, Reply } from 'lucide-react';

interface Comment {
  id: number;
  userName: string;
  avatar?: string;
  content: string;
  date: string;
  replies?: Comment[];
}

interface ProductCommentsProps {
  comments: Comment[];
}

const ProductComments: React.FC<ProductCommentsProps> = ({ comments }) => {
  const [newComment, setNewComment] = useState({ name: '', content: '' });
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New comment:', newComment);
    alert('Bình luận đã được gửi!');
    setNewComment({ name: '', content: '' });
  };

  const handleSubmitReply = (e: React.FormEvent, commentId: number) => {
    e.preventDefault();
    console.log('Reply to comment:', commentId, replyContent);
    alert('Phản hồi đã được gửi!');
    setReplyTo(null);
    setReplyContent('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({
    comment,
    isReply = false,
  }) => (
    <div className={`${isReply ? 'ml-12' : ''}`}>
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {comment.avatar ? (
            <img
              src={comment.avatar}
              alt={comment.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-semibold text-sm">
                {comment.userName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        {/* Comment Content */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h6 className="font-semibold text-gray-900">{comment.userName}</h6>
            <span className="text-sm text-gray-500">
              {formatDate(comment.date)}
            </span>
          </div>
          <p className="text-gray-700 mb-2">{comment.content}</p>

          {!isReply && (
            <button
              onClick={() =>
                setReplyTo(replyTo === comment.id ? null : comment.id)
              }
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-orange-500 transition-colors"
            >
              <Reply className="h-4 w-4" />
              <span>Phản hồi</span>
            </button>
          )}

          {/* Reply Form */}
          {replyTo === comment.id && (
            <form
              onSubmit={(e) => handleSubmitReply(e, comment.id)}
              className="mt-4 space-y-3"
            >
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                placeholder="Viết phản hồi..."
                required
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                >
                  Gửi
                </button>
                <button
                  type="button"
                  onClick={() => setReplyTo(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-400 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="h-6 w-6 text-orange-500" />
        <h3 className="text-xl font-semibold text-gray-900">
          Hỏi đáp về sản phẩm ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newComment.name}
            onChange={(e) =>
              setNewComment((prev) => ({ ...prev, name: e.target.value }))
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            placeholder="Tên của bạn"
            required
          />
        </div>
        <textarea
          value={newComment.content}
          onChange={(e) =>
            setNewComment((prev) => ({ ...prev, content: e.target.value }))
          }
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
          placeholder="Đặt câu hỏi về sản phẩm..."
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          Gửi câu hỏi
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductComments;
