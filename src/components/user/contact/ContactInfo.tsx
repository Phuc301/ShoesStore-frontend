import React, { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Vui lòng chọn chủ đề';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập nội dung tin nhắn';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Gửi Tin Nhắn Cho Chúng Tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Có câu hỏi hoặc cần hỗ trợ? Hãy điền form bên dưới và chúng tôi sẽ
            liên hệ lại sớm nhất
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  <User className="h-4 w-4 inline mr-2" />
                  Họ và tên *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full input-base`}
                  placeholder="Nhập họ và tên của bạn"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full input-base`}
                  placeholder="Nhập địa chỉ email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  <Phone className="h-4 w-4 inline mr-2" />
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full input-base`}
                  placeholder="Nhập số điện thoại (tùy chọn)"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  <MessageSquare className="h-4 w-4 inline mr-2" />
                  Chủ đề *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full input-base`}
                >
                  <option value="">Chọn chủ đề</option>
                  <option value="product">Hỏi về sản phẩm</option>
                  <option value="order">Đơn hàng & Giao hàng</option>
                  <option value="return">Đổi trả & Bảo hành</option>
                  <option value="complaint">Khiếu nại</option>
                  <option value="other">Khác</option>
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nội dung tin nhắn *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`w-full input-base`}
                placeholder="Nhập nội dung tin nhắn của bạn..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Gửi Tin Nhắn</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
