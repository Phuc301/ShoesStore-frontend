import React from 'react';
import { Users, ShoppingBag, Award, MapPin } from 'lucide-react';

const milestones = [
  {
    id: 1,
    icon: Users,
    number: '50,000+',
    label: 'Khách hàng hài lòng',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
  },
  {
    id: 2,
    icon: ShoppingBag,
    number: '100,000+',
    label: 'Sản phẩm đã bán',
    color: 'text-green-500',
    bgColor: 'bg-green-100',
  },
  {
    id: 3,
    icon: Award,
    number: '15+',
    label: 'Giải thưởng nhận được',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
  },
  {
    id: 4,
    icon: MapPin,
    number: '25+',
    label: 'Cửa hàng trên toàn quốc',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
  },
];

const Milestones = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Thành Tựu Của Chúng Tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Những con số ấn tượng khẳng định vị thế và uy tín của ShoeStore
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone) => {
            const IconComponent = milestone.icon;
            return (
              <div
                key={milestone.id}
                className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-6">
                  <div className={`${milestone.bgColor} p-4 rounded-full`}>
                    <IconComponent className={`h-8 w-8 ${milestone.color}`} />
                  </div>
                </div>
                <div className={`text-4xl font-bold ${milestone.color} mb-2`}>
                  {milestone.number}
                </div>
                <p className="text-gray-600 font-medium">{milestone.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Milestones;
