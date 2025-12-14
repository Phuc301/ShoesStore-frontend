import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';

const BrandStory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Câu Chuyện Thương Hiệu
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Được thành lập từ năm 2015, ShoeStore bắt đầu từ một ý tưởng đơn
                giản: mang đến những đôi giày chất lượng cao với giá cả phải
                chăng cho mọi người.
              </p>
              <p>
                Chúng tôi tin rằng một đôi giày không chỉ là phụ kiện thời
                trang, mà còn là người bạn đồng hành trong mọi hành trình của
                cuộc sống. Từ những bước chân đầu tiên đến những chặng đường
                dài, chúng tôi luôn đồng hành cùng bạn.
              </p>
              <p>
                Với hơn 8 năm kinh nghiệm trong ngành, chúng tôi đã phục vụ hàng
                nghìn khách hàng và không ngừng cải tiến để mang đến trải nghiệm
                mua sắm tốt nhất.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
              alt="Brand Story"
              className="w-full max-w-md rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gray-50 rounded-2xl">
            <div className="flex justify-center mb-6">
              <div className="bg-orange-100 p-4 rounded-full">
                <Target className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sứ Mệnh</h3>
            <p className="text-gray-600 leading-relaxed">
              Mang đến những sản phẩm giày chất lượng cao, thiết kế hiện đại và
              giá cả hợp lý cho mọi khách hàng Việt Nam.
            </p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-2xl">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Eye className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tầm Nhìn</h3>
            <p className="text-gray-600 leading-relaxed">
              Trở thành thương hiệu giày hàng đầu Việt Nam, được khách hàng tin
              tưởng và lựa chọn cho mọi hoạt động.
            </p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-2xl">
            <div className="flex justify-center mb-6">
              <div className="bg-pink-100 p-4 rounded-full">
                <Heart className="h-8 w-8 text-pink-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Giá Trị</h3>
            <p className="text-gray-600 leading-relaxed">
              Chất lượng, uy tín, sáng tạo và luôn đặt khách hàng làm trung tâm
              trong mọi hoạt động kinh doanh.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
