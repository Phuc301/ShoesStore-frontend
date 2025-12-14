import React from 'react';
import { MapPin, Plus, Check } from 'lucide-react';
import type { Address } from '@/interfaces/auth.interface';
import { useNavigate } from 'react-router-dom';

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId: number;
  onAddressSelect: (addressId: number) => void;
  onAddNewAddress: () => void;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
  addresses,
  selectedAddressId,
  onAddressSelect,
  onAddNewAddress,
}) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <MapPin className="h-5 w-5 mr-2 text-orange-500" />
        Địa chỉ giao hàng
      </h3>
      <div className="space-y-3">
        {addresses.length === 0 && (
          <div className="border rounded-lg p-4 cursor-pointer transition-colors border-gray-300 hover:border-gray-400">
            <div className="flex items-center space-x-2">
              <span
                className="font-semibold text-gray-900"
                onClick={() => navigate('/profile?tabkeyProfile=addressBook')}
              >
                Hiện chưa có địa chỉ giao hàng. Vui lòng truy cập trang quản lý
                địa chỉ để thêm điểm giao hàng.
              </span>
            </div>
          </div>
        )}
        {addresses &&
          addresses.map((address) => (
            <div
              key={address.addressId}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedAddressId === address.addressId
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => onAddressSelect(address.addressId)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-gray-900">
                      {address.fullName}
                    </span>
                    <span className="text-gray-600">|</span>
                    <span className="text-gray-600">{address.phone}</span>
                    {address.isDefault && (
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                        Mặc định
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm">
                    {address.detailAddress}, {address.street}, {address.ward},{' '}
                    {address.district}, {address.province}{' '}
                  </p>
                </div>
                {selectedAddressId === address.addressId && (
                  <Check className="h-5 w-5 text-orange-500 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        {/* <button
          onClick={onAddNewAddress}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Address</span>
        </button> */}
      </div>
    </div>
  );
};

export default AddressSelector;
