import React from 'react';
import { Zap, Clock, ArrowRight } from 'lucide-react';

const PromotionHero = () => {
  return (
    <section className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 py-16 lg:py-24 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-8 w-8 text-yellow-300" />
              <span className="text-lg font-bold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                MEGA SALE 2024
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Sale Mùa Hè
              <span className="block text-yellow-300">Giảm Tới 50%</span>
            </h1>

            <p className="text-xl text-white/90 max-w-lg">
              Cơ hội vàng sở hữu những đôi giày thời trang và thể thao hàng đầu
              với mức giá không thể tin được!
            </p>

            {/* Countdown Timer */}
            <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <Clock className="h-6 w-6 text-yellow-300" />
              <span className="font-semibold">Kết thúc sau:</span>
              <div className="flex space-x-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">05</div>
                  <div className="text-xs">Ngày</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">14</div>
                  <div className="text-xs">Giờ</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-xs">Phút</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Mua Ngay</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                Khám Phá Sản Phẩm
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <img
                  src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
                  alt="Sale Product"
                  className="w-64 h-64 object-cover rounded-full transform rotate-12 hover:rotate-0 transition-transform duration-500"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-lg animate-bounce">
                -50%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionHero;
