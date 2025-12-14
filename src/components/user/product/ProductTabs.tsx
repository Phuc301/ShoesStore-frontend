import React, { useState } from 'react';

interface ProductTabsProps {
  product: {
    description: string;
    specifications: { [key: string]: string };
    careInstructions: string[];
  };
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Mô tả' },
    // { id: 'specifications', label: 'Thông số' },
    // { id: 'care', label: 'Hướng dẫn bảo quản' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="space-y-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex border-b border-gray-100 pb-2">
                <dt className="w-1/3 font-semibold text-gray-900">{key}:</dt>
                <dd className="w-2/3 text-gray-700">{value}</dd>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'care' && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-4">
              Hướng dẫn bảo quản:
            </h4>
            <ul className="space-y-2">
              {product.careInstructions.map((instruction, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></span>
                  <span className="text-gray-700">{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
