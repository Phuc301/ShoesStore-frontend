import { Zap, Clock } from 'lucide-react';

const PromotionBanner = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-yellow-300 mr-2" />
            <span className="text-lg font-semibold">FLASH SALE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            GIẢM GIÁ LÊN ĐẾN 50%
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Cơ hội sở hữu những đôi giày yêu thích với mức giá không thể tin
            được. Chương trình có thời hạn, nhanh tay đặt mua ngay!
          </p>

          <div className="flex items-center justify-center mb-8 space-x-4">
            <Clock className="h-6 w-6 text-yellow-300" />
            <span className="text-lg font-semibold">Kết thúc sau:</span>
            <div className="flex space-x-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold">02</div>
                <div className="text-sm">Ngày</div>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold">14</div>
                <div className="text-sm">Giờ</div>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold">35</div>
                <div className="text-sm">Phút</div>
              </div>
            </div>
          </div>

          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-4 rounded-lg font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105">
            Mua Ngay - Tiết Kiệm 50%
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;
