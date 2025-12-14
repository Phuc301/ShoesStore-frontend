import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Nguyễn Minh Anh',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    rating: 5,
    comment:
      'Chất lượng giày rất tốt, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận. Tôi rất hài lòng với dịch vụ.',
  },
  {
    id: 2,
    name: 'Trần Đức Mạnh',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    rating: 5,
    comment:
      'Mua giày thể thao ở đây được 3 tháng rồi, vẫn rất bền và đẹp. Giá cả hợp lý, sẽ quay lại mua tiếp.',
  },
  {
    id: 3,
    name: 'Lê Thị Hương',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 5,
    comment:
      'Shop tư vấn nhiệt tình, giúp tôi chọn được đôi giày ưng ý. Chất liệu da thật, form dáng đẹp, đi rất êm chân.',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Khách Hàng Nói Gì
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hàng nghìn khách hàng đã tin tưởng và hài lòng với sản phẩm của
            chúng tôi
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-6">
                "{testimonials[currentIndex].comment}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">Khách hàng thân thiết</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
