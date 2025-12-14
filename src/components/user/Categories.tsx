import { fetchCategories } from '@/api';
import type { Category } from '@/interfaces/admin/ProductManagement/category.interface';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categoriesTop, setCategoriesTop] = useState<Category[]>([]);
  const getTopCategories = async () => {
    const response = await fetchCategories({ limit: 4, page: 1 });
    if (response) {
      setCategoriesTop(response.data);
    }
    
  };
  useEffect(() => {
    getTopCategories();
  }, []);
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Danh Mục Sản Phẩm
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tìm đúng phong cách phù hợp với bạn từ các danh mục đa dạng của
            chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesTop && categoriesTop.map((category) => (
            <div
              key={category.categoryId}
              className="group cursor-pointer"
              onClick={() => navigate(`/product?categories=${category.slug}`)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 aspect-square mb-4">
                <img
                  src={
                    category.image
                      ? category.image
                      : 'https://images.pexels.com/photos/1670766/pexels-photo-1670766.jpeg'
                  }
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/90">
                      {category.totalProducts}+ sản phẩm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Không tìm thấy phong cách phù hợp?
          </p>
          <button
            className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer"
            onClick={() => navigate('/product')}
          >
            Khám Phá Thêm Danh Mục
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
