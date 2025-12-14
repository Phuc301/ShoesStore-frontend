import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PromotionModalProps {
  promotion?: any | null;
  mode: 'create' | 'edit' | 'view';
  onClose: () => void;
  onSave?: (data: any) => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({
  promotion,
  mode,
  onClose,
  onSave,
}) => {
  const readOnly = mode === 'view';

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    discountValue: 0,
    discountType: 'percentage',
    usageLimit: 10,
    minOrderValue: 0,
    maxDiscountValue: 0,
    isActive: true,
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (!promotion) return;

    setFormData({
      name: promotion.name || '',
      code: promotion.code || '',
      description: promotion.description || '',
      discountValue: promotion.discountValue || 0,
      discountType: promotion.discountType?.toLowerCase() || 'percentage',
      usageLimit: promotion.usageLimit || 0,
      minOrderValue: promotion.minOrderValue || 0,
      maxDiscountValue: promotion.maxDiscountValue || 0,
      isActive: promotion.isActive ?? true,
      startDate: promotion.startDate
        ? promotion.startDate.substring(0, 10)
        : '',
      endDate: promotion.endDate ? promotion.endDate.substring(0, 10) : '',
    });
  }, [promotion]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    const newValue =
      type === 'checkbox' ? (target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = () => {
    if (onSave) onSave(formData);
  };

  const renderUsageHistory = () => {
    if (mode !== 'view' || !promotion?.usages?.length) return null;

    return (
      <div className="border p-3 rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Usage History</h3>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {promotion.usages.map((u: any) => (
            <div
              key={u._id}
              className="p-2 border rounded bg-white flex justify-between"
            >
              <div>
                <p>
                  <span className="font-medium">Order:</span> {u.orderId}
                </p>
                <p>
                  <span className="font-medium">User:</span> {u.userId}
                </p>
              </div>

              <div className="text-right">
                <p className="font-medium text-green-600">
                  -{u.amountSaved.toLocaleString()}₫
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(u.usedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay bg-opacity-40">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl p-6 relative">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === 'create' && 'Tạo mới mã khuyến mãi'}
            {mode === 'edit' && 'Sửa mã khuyến mãi'}
            {mode === 'view' && 'Chi tiết mã khuyến mãi'}
          </h2>

          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
          {/* NAME & CODE */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Tên mã"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={readOnly}
            />
            <Input
              label="Mã khuyến mãi"
              name="code"
              value={formData.code}
              onChange={handleChange}
              readOnly={readOnly}
            />
          </div>

          {/* DESCRIPTION */}
          <TextArea
            label="Mô tả"
            name="description"
            value={formData.description}
            onChange={handleChange}
            readOnly={readOnly}
          />

          {/* DISCOUNT */}
          <div className="grid grid-cols-2 gap-4">
            <InputNumber
              label="Giá trị"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleChange}
              readOnly={readOnly}
            />
            <Select
              label="Loại khuyến mãi"
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              readOnly={readOnly}
              options={[
                { value: 'percentage', label: 'Phần trăm' },
                { value: 'fixed', label: 'Giá cứng' },
              ]}
            />
          </div>

          {/* LIMITS */}
          <div className="grid grid-cols-3 gap-4">
            {/* <InputNumber
              label="Giới hạn sử dụng"
              name="usageLimit"
              value={formData.usageLimit}
              onChange={handleChange}
              readOnly={readOnly}
            /> */}
            <InputNumber
              label="Điều kiện từ (đ)"
              name="minOrderValue"
              value={formData.minOrderValue}
              onChange={handleChange}
              readOnly={readOnly}
            />
            <InputNumber
              label="Tối đa giảm (đ)"
              name="maxDiscountValue"
              value={formData.maxDiscountValue}
              onChange={handleChange}
              readOnly={readOnly}
            />
          </div>

          {/* DATE RANGE */}
          {/* <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              label="Ngày bắt đầu"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              readOnly={readOnly}
            />
            <Input
              type="date"
              label="Ngày kết thúc"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              readOnly={readOnly}
            />
          </div> */}

          {/* ACTIVE */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              disabled={readOnly}
              checked={formData.isActive}
              onChange={handleChange}
            />
            <label className="font-medium">Khả dụng</label>
          </div>

          {/* USAGE HISTORY (VIEW MODE) */}
          {renderUsageHistory()}
        </div>

        {/* FOOTER */}
        {!readOnly && (
          <div className="mt-4 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Hủy
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {mode === 'create' ? 'Tạo mới' : 'Lưu'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionModal;

const Input = ({ label, readOnly, ...rest }: any) => (
  <div>
    <label className="font-medium">{label}</label>
    <input
      {...rest}
      disabled={readOnly}
      className="w-full border p-2 rounded"
    />
  </div>
);

const InputNumber = (props: any) => <Input type="number" {...props} />;

const TextArea = ({ label, readOnly, ...rest }: any) => (
  <div>
    <label className="font-medium">{label}</label>
    <textarea
      {...rest}
      disabled={readOnly}
      className="w-full border p-2 rounded h-20"
    />
  </div>
);

const Select = ({ label, options, readOnly, ...rest }: any) => (
  <div>
    <label className="font-medium">{label}</label>
    <select {...rest} disabled={readOnly} className="w-full border p-2 rounded">
      {options.map((o: any) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);
