import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    position: 'Founder & CEO',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    bio: 'Với hơn 10 năm kinh nghiệm trong ngành thời trang, An đã dẫn dắt ShoeStore trở thành thương hiệu uy tín.',
    linkedin: '#',
    email: 'an@shoestore.com',
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    position: 'Head of Design',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    bio: 'Bình chịu trách nhiệm thiết kế và phát triển các dòng sản phẩm mới, luôn bắt kịp xu hướng thời trang.',
    linkedin: '#',
    email: 'binh@shoestore.com',
  },
  {
    id: 3,
    name: 'Lê Minh Cường',
    position: 'Head of Sales',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    bio: 'Cường có kinh nghiệm sâu rộng trong bán hàng và chăm sóc khách hàng, đảm bảo dịch vụ tốt nhất.',
    linkedin: '#',
    email: 'cuong@shoestore.com',
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    position: 'Marketing Manager',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    bio: 'Dung phụ trách các chiến dịch marketing sáng tạo, giúp thương hiệu tiếp cận được nhiều khách hàng hơn.',
    linkedin: '#',
    email: 'dung@shoestore.com',
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Đội Ngũ Của Chúng Tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gặp gỡ những con người tài năng đằng sau thành công của ShoeStore
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-orange-500 font-semibold mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>

                <div className="flex space-x-3">
                  <a
                    href={member.linkedin}
                    className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 bg-gray-100 rounded-full hover:bg-orange-100 hover:text-orange-600 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
