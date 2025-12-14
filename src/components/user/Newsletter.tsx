import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    alert('Cảm ơn bạn đã đăng ký nhận tin!');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
              <Mail className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Nhận Tin Khuyến Mãi & Sản Phẩm Mới Nhất
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Đăng ký ngay để không bỏ lỡ những ưu đãi hấp dẫn và cập nhật sản
            phẩm mới nhất từ chúng tôi
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email của bạn"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                required
              />
              <button
                type="submit"
                className="bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Đăng Ký</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>

          <p className="text-sm text-white/80 mt-4">
            Chúng tôi cam kết không spam và bảo vệ thông tin cá nhân của bạn
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
