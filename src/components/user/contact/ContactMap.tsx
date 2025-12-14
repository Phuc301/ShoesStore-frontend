import { MapPin, Navigation, ExternalLink } from 'lucide-react';

const ContactMap = () => {
  const handleOpenMap = () => {
    const address = '123 Phố Giày, Quận 1, Thành phố Hồ Chí Minh';
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      '_blank'
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Vị Trí Cửa Hàng
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ghé thăm cửa hàng của chúng tôi để trải nghiệm sản phẩm trực tiếp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map Placeholder */}
          <div className="relative">
            <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Bản đồ Google Maps</p>
                <button
                  onClick={handleOpenMap}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-2 mx-auto"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>Mở Google Maps</span>
                </button>
              </div>
            </div>
          </div>

          {/* Store Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ShoeStore - Cửa Hàng Chính
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                    <MapPin className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Địa chỉ
                    </h4>
                    <p className="text-gray-600">
                      123 Phố Giày, Quận 1<br />
                      Thành phố Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                    <Navigation className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Hướng dẫn đường đi
                    </h4>
                    <p className="text-gray-600 mb-3">
                      Gần ngã tư Nguyễn Huệ - Lê Lợi, cách Bưu điện Trung tâm
                      200m
                    </p>
                    <button
                      onClick={handleOpenMap}
                      className="text-orange-500 hover:text-orange-600 font-semibold flex items-center space-x-1"
                    >
                      <Navigation className="h-4 w-4" />
                      <span>Xem chỉ đường</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Features */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">
                Tiện ích tại cửa hàng
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Thử giày miễn phí</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Tư vấn chuyên nghiệp</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Bãi đỗ xe miễn phí</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Wifi miễn phí</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
