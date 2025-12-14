const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-orange-400 via-pink-400 to-red-400 text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Bước Đi
              <span className="block">Phong Cách</span>
              <span className="text-yellow-300">Của Bạn</span>
            </h1>
            <p className="text-xl text-white/90 max-w-lg">
              Khám phá bộ sưu tập giày thời trang và thể thao mới nhất. Chất
              lượng cao, thiết kế hiện đại, giá cả phải chăng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Mua Ngay
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                Khám Phá Bộ Sưu Tập
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <img
                  src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
                  alt="Featured Shoe"
                  className="w-64 h-64 object-cover rounded-full transform rotate-12 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
