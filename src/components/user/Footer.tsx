import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Shoe<span className="text-orange-500">Store</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Cửa hàng giày thời trang hàng đầu với hơn 10 năm kinh nghiệm.
              Chúng tôi cam kết mang đến những sản phẩm chất lượng nhất.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-orange-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Liên Kết Nhanh</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Sản phẩm
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Khuyến mãi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Tin tức
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Chính Sách</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Đổi trả hàng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Bảo mật thông tin
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Điều khoản dịch vụ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Thông Tin Liên Hệ</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-500" />
                <span className="text-gray-400">
                  123 Phố Giày, Quận 1, TP.HCM
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-gray-400">1900 1234</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500" />
                <span className="text-gray-400">info@shoestore.com</span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Giờ mở cửa:</p>
              <p className="text-sm text-gray-400">
                Thứ 2 - Chủ nhật: 9:00 - 22:00
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 ShoeStore. Tất cả quyền được bảo lưu. |
            <a
              href="#"
              className="hover:text-orange-500 transition-colors ml-1"
            >
              Điều khoản sử dụng
            </a>{' '}
            |
            <a
              href="#"
              className="hover:text-orange-500 transition-colors ml-1"
            >
              Chính sách riêng tư
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
