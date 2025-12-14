import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const AboutCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
              <ShoppingBag className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Sẵn Sàng Khám Phá?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Hãy để chúng tôi đồng hành cùng bạn trong mọi bước chân. Khám phá bộ
            sưu tập giày đa dạng và chất lượng của chúng tôi ngay hôm nay!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <span>Khám Phá Sản Phẩm</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
              Liên Hệ Với Chúng Tôi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
