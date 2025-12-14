import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import type {
  Address,
  AddressInfoFormRef,
  Option,
} from '@/interfaces/auth.interface';
import { MapPin } from 'lucide-react';
import { addNewAddress, updateAddress } from './../../api/user.api';

interface AddressFormProps {
  addresses: Address[];
  handleShowAddressForm: () => void;
}
const AddressForm = forwardRef<AddressInfoFormRef, AddressFormProps>(
  ({ handleShowAddressForm }, ref) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [provices, setProvinces] = useState<Option[]>([]);
    const [districts, setDistricts] = useState<Option[]>([]);
    const [wards, setWards] = useState<Option[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<Option | null>(
      null
    );
    const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(
      null
    );
    const [selectedWard, setSelectedWard] = useState<Option | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState<number | null>(
      null
    );
    // Fetch provinces
    useEffect(() => {
      fetchProvinces();
    }, []);
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
      const selected =
        provices.find((p) => p.value.toString() === value) || null;
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
          // if (!response.success) {
          //   setToast({ message: 'Failed to update address', type: 'error' });
          //   return;
          // }
          // setAddresses(
          //   addresses.map((addr) =>
          //     addr.addressId === editingAddressId ? response.data : addr
          //   )
          // );
          // setToast({ message: 'Address updated', type: 'success' });
        } else {
          response = await addNewAddress(data);
          if (!response.success) {
            // setToast({ message: 'Failed to add address', type: 'error' });
            return;
          }
          // setAddresses([...addresses, response.data]);
          // setToast({ message: 'Address added', type: 'success' });
        }
        handleCancel();
      } catch (error) {
        // setToast({ message: 'Failed to add/update address', type: 'error' });
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
      handleShowAddressForm();
    };
    const validateForm = () => {
      const requiredFields = [
        name,
        phone,
        street,
        detailAddress,
        selectedProvince,
        selectedDistrict,
        selectedWard,
      ];
      return requiredFields.every(Boolean);
    };

    useImperativeHandle(ref, () => ({
      validate: validateForm,
      data: {
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
      },
    }));

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-orange-500" />
            Địa chỉ giao hàng
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={handleNameChange}
              className="w-full input-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Số điện thoại"
              className="w-full input-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tỉnh <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full input-base"
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thành Phố/huyện <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full input-base"
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Xã/phường <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full input-base"
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đường <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={street}
              onChange={handleStreetChange}
              placeholder="Nhâp điểm đường/phố"
              className="w-full input-base"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ chi tiết <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={detailAddress}
              onChange={handleDetailAddressChange}
              placeholder="Địa chỉ cụ thể"
              className="w-full md:col-span-2 input-base"
            />
          </div>
        </div>
        {/* <div className="flex justify-end space-x-2 mt-4">
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
      </div>{' '} */}
        {/* {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )} */}
      </div>
    );
  }
);
export default AddressForm;
