import React, { useEffect, useState } from 'react';
import { MapPin, Plus, Edit3, Trash2, Home, Building } from 'lucide-react';
import {
  addNewAddress,
  deleteAddress,
  getAddress,
  setDefaultAddress,
  updateAddress,
} from './../../api/user.api';
import Toast from '../common/Toast';
import type { Address, Option } from '@/interfaces/auth.interface';
import Loading from '../common/Loading';

const AddressBook: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [provices, setProvinces] = useState<Option[]>([]);
  const [districts, setDistricts] = useState<Option[]>([]);
  const [wards, setWards] = useState<Option[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Option | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(null);
  const [selectedWard, setSelectedWard] = useState<Option | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  useEffect(() => {
    getAddressByUser();
    fetchProvinces();
  }, []);
  // Fetch addresses
  const getAddressByUser = async () => {
    try {
      setLoading(true);
      const response = await getAddress();
      if (response && response.data) {
        setAddresses(response.data);
      }
    } catch (error) {
      setToast({ message: 'An error occurred', type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  // Get icon based on address type
  const getAddressIcon = (type: Address['type']) => {
    return type === 'home' ? (
      <Home className="w-5 h-5 text-[#FF6B35]" />
    ) : (
      <Building className="w-5 h-5 text-[#FF6B35]" />
    );
  };
  // Set default address
  const handleSetDefault = async (addressId: number) => {
    try {
      setLoading(true);
      const response = await setDefaultAddress(addressId);
      if (response.success) {
        setToast({ message: 'Default address set', type: 'success' });
        setAddresses(
          addresses.map((addr) => ({
            ...addr,
            isDefault: addr.addressId === addressId,
          }))
        );
        return;
      }
      setToast({ message: 'Failed to set default address', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to set default address', type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  // Handle delete address
  const handleDelete = async (addressId: number) => {
    try {
      const response = await deleteAddress(addressId);
      if (response.success) {
        setToast({ message: 'Address deleted', type: 'success' });
        setAddresses(addresses.filter((addr) => addr.addressId !== addressId));
        return;
      }
      setToast({ message: 'Failed to delete address', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to delete address', type: 'error' });
    }
  };
  // Fetch provinces
  const fetchProvinces = async () => {
    try {
      const response = await fetch('https://provinces.open-api.vn/api/v1/');
      const data = await response.json();
      const options = data.map((prov: any) => ({
        label: prov.name,
        value: prov.code,
      }));
      setProvinces(options);
    } catch (error) {
      console.error('Failed to fetch provinces', error);
    }
  };
  // Fetch districts based on selected province
  const fetchDistricts = async (provinceCode: string) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/v1/d`);
      const data = await response.json();
      const options = data
        .filter((dist: any) => dist.province_code === Number(provinceCode))
        .map((dist: any) => ({
          label: dist.name,
          value: dist.code,
        }));
      setDistricts(options);
    } catch (error) {
      console.error('Failed to fetch districts', error);
    }
  };
  // Fetch wards based on selected district
  const fetchWards = async (districtCode: string) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/v1/w`);
      const data = await response.json();
      const options = data
        .filter((ward: any) => ward.district_code === Number(districtCode))
        .map((ward: any) => ({
          label: ward.name,
          value: ward.code,
        }));
      setWards(options);
    } catch (error) {
      console.error('Failed to fetch wards', error);
    }
  };
  // Handle onchange for province
  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selected = provices.find((p) => p.value.toString() === value) || null;
    setSelectedProvince(selected);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setDistricts([]);
    setWards([]);
    if (selected) {
      fetchDistricts(selected.value);
    }
  };
  // Handle onchange for district
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selected =
      districts.find((d) => d.value.toString() === value) || null;
    setSelectedDistrict(selected);
    setSelectedWard(null);
    setWards([]);
    if (selected) {
      fetchWards(selected.value);
    }
  };
  // Handle onchange for ward
  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selected = wards.find((w) => w.value.toString() === value) || null;
    setSelectedWard(selected);
  };
  // Handle add new address (not implemented yet)
  const handleAddOrUpdateAddress = async () => {
    try {
      setLoading(true);
      const data = {
        fullName: name,
        phone,
        street,
        detailAddress,
        province: selectedProvince?.label || '',
        provinceCode: selectedProvince?.value || '',
        district: selectedDistrict?.label || '',
        districtCode: selectedDistrict?.value || '',
        ward: selectedWard?.label || '',
        wardCode: selectedWard?.value || '',
        type: 'home',
      };

      let response: any;
      if (isEditing && editingAddressId) {
        response = await updateAddress(editingAddressId, data);
        if (!response.success) {
          setToast({ message: 'Failed to update address', type: 'error' });
          return;
        }
        setAddresses(
          addresses.map((addr) =>
            addr.addressId === editingAddressId ? response.data : addr
          )
        );
        setToast({ message: 'Address updated', type: 'success' });
      } else {
        response = await addNewAddress(data);
        if (!response.success) {
          setToast({ message: 'Failed to add address', type: 'error' });
          return;
        }
        setAddresses([...addresses, response.data]);
        setToast({ message: 'Address added', type: 'success' });
      }
      // Reset form
      handleCancel();
    } catch (error) {
      setToast({ message: 'Failed to add/update address', type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  // Handle name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  // Handle phone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  // Handle street
  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };
  // Handle detail address
  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDetailAddress(e.target.value);
  };
  // Handle edit address
  const handleEdit = async (addressId: number) => {
    const address = addresses.find((addr) => addr.addressId === addressId);
    if (!address) return;
    // Set form values
    setEditingAddressId(address.addressId);
    setIsEditing(true);
    setName(address.fullName);
    setPhone(address.phone);
    setStreet(address.street);
    setDetailAddress(address.detailAddress);
    // Set province
    const provinceOption = {
      label: address.province,
      value: address.provinceCode,
    };
    setSelectedProvince(provinceOption);
    // Fetch province's districts and wards
    try {
      const resDistricts = await fetch(
        `https://provinces.open-api.vn/api/v1/p/${address.provinceCode}?depth=2`
      );
      const dataDistricts = await resDistricts.json();
      const districtOptions = dataDistricts.districts.map((d: any) => ({
        label: d.name,
        value: d.code,
      }));
      setDistricts(districtOptions);
      // Set district
      const districtOption = {
        label: address.district,
        value: address.districtCode,
      };
      setSelectedDistrict(districtOption);

      const resWards = await fetch(
        `https://provinces.open-api.vn/api/v1/d/${address.districtCode}?depth=2`
      );
      const dataWards = await resWards.json();
      const wardOptions = dataWards.wards.map((w: any) => ({
        label: w.name,
        value: w.code,
      }));
      setWards(wardOptions);
      // Set ward
      setSelectedWard({ label: address.ward, value: address.wardCode });
    } catch (error) {
      console.error('Failed to fetch districts or wards', error);
    }
    // Show modal
    setShowAddForm(true);
  };
  // Handle cancel
  const handleCancel = () => {
    setShowAddForm(false);
    setIsEditing(false);
    setName('');
    setPhone('');
    setStreet('');
    setDetailAddress('');
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setDistricts([]);
    setWards([]);
  };
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="w-6 h-6 text-[#FF6B35] mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Quản lý địa chỉ
            </h2>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm địa chỉ</span>
          </button>
        </div>
      </div>
      {showAddForm && (
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {isEditing ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={handleNameChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
            />
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Số điện thoại"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
            />
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              value={selectedProvince?.value || ''}
              onChange={handleProvinceChange}
            >
              <option value="">Chọn tỉnh/thành phố</option>
              {provices.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              value={selectedDistrict?.value || ''}
              onChange={handleDistrictChange}
              disabled={!districts.length}
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              value={selectedWard?.value || ''}
              onChange={handleWardChange}
              disabled={!wards.length}
            >
              <option value="">Chọn xã/phường</option>
              {wards.map((w) => (
                <option key={w.value} value={w.value}>
                  {w.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={street}
              onChange={handleStreetChange}
              placeholder="Nhâp điểm đường/phố"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
            />
            <input
              type="text"
              value={detailAddress}
              onChange={handleDetailAddressChange}
              placeholder="Địa chỉ cụ thể"
              className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => handleCancel()}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={() => handleAddOrUpdateAddress()}
              className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#e55a2b] transition-colors"
            >
              {isEditing ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </div>
      )}
      {!showAddForm && (
        <div className="divide-y divide-gray-200">
          {addresses.map((address) => (
            <div key={address.addressId} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getAddressIcon(address.type)}
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">
                        {address.fullName}
                      </h3>
                      {address.isDefault && (
                        <span className="px-2 py-1 bg-[#FF6B35] text-white text-xs rounded-full">
                          Mặc định
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-gray-600 space-y-1">
                    <p className="font-medium">{address.phone}</p>
                    <p>
                      {address.detailAddress}, {address.street}
                    </p>
                    <p>
                      {address.ward}, {address.district}, {address.province}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleSetDefault(address.addressId)}
                    disabled={address.isDefault}
                    className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {address.isDefault ? 'Mặc định' : 'Đặt mặc định'}
                  </button>
                  <button
                    onClick={() => handleEdit(address.addressId)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.addressId)}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {addresses.length === 0 && (
        <div className="p-8 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Bạn chưa có địa chỉ nào</p>
        </div>
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Loading show={loading} />
    </div>
  );
};

export default AddressBook;
