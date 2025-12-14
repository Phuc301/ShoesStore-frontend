import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
} from 'lucide-react';

const ContactInfo = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Thông Tin Liên Hệ
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nhiều cách để bạn có thể kết nối và liên hệ với chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Address */}
          <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="bg-orange-100 p-4 rounded-full">
                <MapPin className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Địa Chỉ</h3>
            <p className="text-gray-600 leading-relaxed">
              123 Phố Giày, Quận 1<br />
              Thành phố Hồ Chí Minh
              <br />
              Việt Nam
            </p>
          </div>

          {/* Phone */}
          <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Phone className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Điện Thoại</h3>
            <p className="text-gray-600 leading-relaxed">
              Hotline:{' '}
              <a href="tel:19001234" className="text-blue-500 hover:underline">
                1900 1234
              </a>
              <br />
              Mobile:{' '}
              <a
                href="tel:0901234567"
                className="text-blue-500 hover:underline"
              >
                090 123 4567
              </a>
              <br />
              Miễn phí 24/7
            </p>
          </div>

          {/* Email */}
          <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <Mail className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Email</h3>
            <p className="text-gray-600 leading-relaxed">
              Tổng đài:{' '}
              <a
                href="mailto:info@shoestore.com"
                className="text-green-500 hover:underline"
              >
                info@shoestore.com
              </a>
              <br />
              Hỗ trợ:{' '}
              <a
                href="mailto:support@shoestore.com"
                className="text-green-500 hover:underline"
              >
                support@shoestore.com
              </a>
              <br />
              Phản hồi trong 24h
            </p>
          </div>

          {/* Hours */}
          <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center mb-6">
              <div className="bg-purple-100 p-4 rounded-full">
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Giờ Mở Cửa</h3>
            <p className="text-gray-600 leading-relaxed">
              Thứ 2 - Thứ 6: 9:00 - 22:00
              <br />
              Thứ 7 - Chủ nhật: 8:00 - 23:00
              <br />
              Lễ Tết: 10:00 - 20:00
            </p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Kết Nối Với Chúng Tôi
          </h3>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors transform hover:scale-110"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="bg-pink-600 text-white p-4 rounded-full hover:bg-pink-700 transition-colors transform hover:scale-110"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors transform hover:scale-110"
            >
              <MessageCircle className="h-6 w-6" />
            </a>
          </div>
          <p className="text-gray-600 mt-4">
            Theo dõi chúng tôi để cập nhật những sản phẩm và ưu đãi mới nhất
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
