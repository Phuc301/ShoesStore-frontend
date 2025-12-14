import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { getAddressByEmail } from '@/api';

interface Customer {
  fullName: string;
  email: string;
  avatarUrl?: string | null;
  role: string;
  sex?: string | null;
  dateOfBirth?: string | null;
  loyaltyPoints: number;
  isVerified: boolean;
  isActive: boolean;
  isRegistered: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface AddressForm {
  addressId?: number;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  detailAddress: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
}

interface CustomerModalProps {
  customer: Customer;
  onClose: () => void;
  onSave: (updated: any) => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  customer,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Customer>({ ...customer });

  const [addressForm, setAddressForm] = useState<AddressForm>({
    addressId: 0,
    fullName: customer.fullName,
    phone: '',
    province: '',
    district: '',
    ward: '',
    street: '',
    detailAddress: '',
    provinceCode: '',
    districtCode: '',
    wardCode: '',
  });

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [address, setAddress] = useState('');

  const loadAddres = async () => {
    try {
      const data = await getAddressByEmail(customer.email);
      const a = data.data?.[0];

      if (!a) return;

      setAddressForm({
        addressId: a.addressId,
        fullName: a.fullName || customer.fullName,
        phone: a.phone || '',
        province: a.province || '',
        district: a.district || '',
        ward: a.ward || '',
        street: a.street || '',
        detailAddress: a.detailAddress || '',
        provinceCode: a.provinceCode || '',
        districtCode: a.districtCode || '',
        wardCode: a.wardCode || '',
      });

      if (a.provinceCode) {
        await loadDistricts(a.provinceCode);
      }
      if (a.districtCode) {
        await loadWards(a.districtCode);
      }
    } catch (err) {
      console.error('Failed to load address:', err);
    }
  };

  useEffect(() => {
    loadAddres();
    fetch('https://provinces.open-api.vn/api/v1/')
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((err) => console.error(err));
  }, []);

  const loadDistricts = async (code: string) => {
    const res = await fetch('https://provinces.open-api.vn/api/v1/d');
    const data = await res.json();
    setDistricts(data.filter((x: any) => x.province_code === Number(code)));
  };

  const loadWards = async (code: string) => {
    const res = await fetch('https://provinces.open-api.vn/api/v1/w');
    const data = await res.json();
    setWards(data.filter((x: any) => x.district_code === Number(code)));
  };

  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddressChange = (e: any) => {
    const { name, value } = e.target;
    setAddressForm((p) => ({ ...p, [name]: value }));
  };

  const handleProvince = (e: any) => {
    const code = e.target.value;
    const p = provinces.find((x) => x.code.toString() === code);

    setAddressForm((s) => ({
      ...s,
      province: p?.name || '',
      provinceCode: code,
      district: '',
      ward: '',
      districtCode: '',
      wardCode: '',
    }));

    loadDistricts(code);
    setDistricts([]);
    setWards([]);
  };

  const handleDistrict = (e: any) => {
    const code = e.target.value;
    const d = districts.find((x) => x.code.toString() === code);

    setAddressForm((s) => ({
      ...s,
      district: d?.name || '',
      districtCode: code,
      ward: '',
      wardCode: '',
    }));

    loadWards(code);
    setWards([]);
  };

  const handleWard = (e: any) => {
    const code = e.target.value;
    const w = wards.find((x) => x.code.toString() === code);

    setAddressForm((s) => ({
      ...s,
      ward: w?.name || '',
      wardCode: code,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      address: addressForm,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 animate-fadeIn">
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Chỉnh sửa thông tin khách hàng
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ✦ THÔNG TIN CÁ NHÂN */}
          <div className="p-5 rounded-xl border bg-gray-50">
            <h3 className="font-semibold text-gray-800 mb-4">
              Thông tin cá nhân
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* NAME */}
              <div>
                <label className="text-sm font-medium">Họ và tên</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* SEX */}
              <div>
                <label className="text-sm font-medium">Giới tính</label>
                <select
                  name="sex"
                  value={formData.sex || ''}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                >
                  <option value="">Chưa chọn</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              {/* DOB */}
              <div>
                <label className="text-sm font-medium">Ngày sinh</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={
                    formData.dateOfBirth
                      ? new Date(formData.dateOfBirth)
                          .toISOString()
                          .split('T')[0]
                      : ''
                  }
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                />
              </div>

              {/* LOYALTY */}
              <div>
                <label className="text-sm font-medium">Điểm tích lũy</label>
                <input
                  type="number"
                  name="loyaltyPoints"
                  value={formData.loyaltyPoints}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-md px-3 py-2"
                />
              </div>
            </div>

            {/* CHECKBOX */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="isVerified"
                  checked={formData.isVerified}
                  onChange={handleChange}
                />
                Đã xác thực
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                Đang hoạt động
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="isRegistered"
                  checked={formData.isRegistered}
                  onChange={handleChange}
                />
                Đã đăng ký
              </label>
            </div>
          </div>

          {/* ✦ ĐỊA CHỈ */}
          <div className="p-5 rounded-xl border bg-gray-50">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin size={18} />
              Địa chỉ giao hàng
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Tên người nhận"
                value={addressForm.fullName}
                onChange={handleAddressChange}
                className="w-full border px-3 py-2 rounded-md"
              />

              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value={addressForm.phone}
                onChange={handleAddressChange}
                className="w-full border px-3 py-2 rounded-md"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  value={addressForm.provinceCode}
                  onChange={handleProvince}
                  className="w-full border px-3 py-2 rounded-md"
                >
                  <option value="">Chọn tỉnh/thành</option>
                  {provinces.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <select
                  value={addressForm.districtCode}
                  onChange={handleDistrict}
                  className="w-full border px-3 py-2 rounded-md"
                  disabled={!districts.length}
                >
                  <option value="">Chọn quận/huyện</option>
                  {districts.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>

                <select
                  value={addressForm.wardCode}
                  onChange={handleWard}
                  className="w-full border px-3 py-2 rounded-md"
                  disabled={!wards.length}
                >
                  <option value="">Chọn phường/xã</option>
                  {wards.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="street"
                  placeholder="Tên đường"
                  value={addressForm.street}
                  onChange={handleAddressChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>

              <input
                type="text"
                name="detailAddress"
                placeholder="Địa chỉ cụ thể"
                value={addressForm.detailAddress}
                onChange={handleAddressChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerModal;
