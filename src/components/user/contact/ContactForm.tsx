import { Mail, Phone, MapPin } from 'lucide-react';

const ContactHero = () => {
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
                Liên Hệ
                <span className="block">Với Chúng Tôi</span>
              </h1>
              <p className="text-xl text-white/90 max-w-lg">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi để
                được tư vấn tốt nhất về sản phẩm và dịch vụ.
              </p>
            </div>

            {/* Quick Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-lg">1900 1234</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="text-lg">info@shoestore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="text-lg">123 Phố Giày, Quận 1, TP.HCM</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <img
                  src="https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg"
                  alt="Contact Us"
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

export default ContactHero;
