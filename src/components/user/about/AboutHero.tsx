import React from 'react';
import { ArrowRight } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 py-20 lg:py-32 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Về Chúng Tôi
              </h1>
              <p className="text-xl text-white/90 max-w-lg">
                Chúng tôi mang đến giày chất lượng, phong cách và tiện nghi cho
                mọi bước chân của bạn
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Khám Phá Sản Phẩm</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <img
                  src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg"
                  alt="About Us"
                  className="w-64 h-64 object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
