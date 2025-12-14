import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import type {
  Product,
  ColorVariant,
  SizeVariant,
} from '../../../interfaces/admin/ProductManagement/product.interface';
import type { Category } from '../../../interfaces/admin/ProductManagement/category.interface';

interface ProductModalProps {
  product?: Product | null;
  onClose: () => void;
  onSave: (
    product: Product,
    variantFiles: any,
    imageFileProduct?: File
  ) => void;
  categories: Category[];
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onSave,
  categories,
}) => {
  interface FormData {
    productId?: number;
    name: string;
    title?: string;
    brand: string;
    categoryId: string;
    imageProduct: string;
    imageFile?: File | null;
    imagePreview?: string | null;
    description: string;
    basePrice: string;
    variants: (ColorVariant & {
      variantImageFiles?: File[];
      variantImagePreviews?: string[];
      variantImageNewUrls?: string[];
      variantRemoveUrls?: string[];
    })[];
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    title: '',
    brand: '',
    categoryId: '',
    description: '',
    imageFile: null,
    imageProduct: '',
    basePrice: '',
    variants: [{ color: '', images: [], sizes: [], sku: '' }],
  });

  const [availableSizes] = useState(() => {
    const sizes: string[] = [];
    for (let i = 30; i <= 50; i += 1) {
      sizes.push(i.toString());
    }
    return sizes;
  });

  const [availableColors] = useState([
    'Black',
    'White',
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Brown',
    'Gray',
    'Navy',
    'Grey',
  ]);
  const [availableBrands] = useState([
    'Nike',
    'Adidas',
    'Puma',
    'Vans',
    'Under Armour',
    'New Balance',
    'Reebok',
    'ASICS',
    'Converse',
    'Skechers',
    'Balenciaga',
    'Gucci',
    'Prada',
    'Anti-slip',
  ]);

  useEffect(() => {
    if (product) {
      setFormData({
        productId: product.productId,
        name: product.name || '',
        title: product.title || '',
        brand: product.brand || '',
        categoryId: product.categoryId.toString() || '',
        imageProduct: product.imageProduct || '',
        description: product.description || '',
        basePrice: product.basePrice.toString() || '',
        variants:
          product.variants?.length > 0
            ? product.variants.map((v) => ({
                ...v,
                variantImageFiles: [],
                variantImagePreviews: v.images || [],
              }))
            : [{ color: '', images: [], sizes: [], sku: '' }],
      });
    }
  }, [product, categories]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        imageFile: file,
        imageProduct: previewUrl,
      });
    }
  };

  const handleRemoveImage = () => {
    if (formData.imageProduct && formData.imageProduct.startsWith('blob:')) {
      URL.revokeObjectURL(formData.imageProduct);
    }
    setFormData({
      ...formData,
      imageFile: null,
      imageProduct: '',
    });
  };

  const handleVariantImageUpload = (
    variantIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newVariants = [...formData.variants];
      const previewUrl = URL.createObjectURL(file);

      if (!newVariants[variantIndex].variantImageFiles) {
        newVariants[variantIndex].variantImageFiles = [];
      }
      if (!newVariants[variantIndex].variantImagePreviews) {
        newVariants[variantIndex].variantImagePreviews = [];
      }
      if (!newVariants[variantIndex].variantImageNewUrls) {
        newVariants[variantIndex].variantImageNewUrls = [];
      }
      if (
        newVariants[variantIndex].variantImageFiles!.length < 3 &&
        newVariants[variantIndex].variantImagePreviews!.length < 3
      ) {
        newVariants[variantIndex].variantImageFiles!.push(file);
        newVariants[variantIndex].variantImagePreviews!.push(previewUrl);
        newVariants[variantIndex].variantImageNewUrls!.push(previewUrl);
      }

      setFormData({ ...formData, variants: newVariants });
    }
  };

  const handleRemoveVariantImage = (
    variantIndex: number,
    imageIndex: number
  ) => {
    const newVariants = [...formData.variants];
    const preview =
      newVariants[variantIndex].variantImagePreviews?.[imageIndex];

    if (preview && preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    if (!newVariants[variantIndex].variantRemoveUrls) {
      newVariants[variantIndex].variantRemoveUrls = [];
    }
    newVariants[variantIndex].variantRemoveUrls?.push(preview ?? '');
    newVariants[variantIndex].variantImageFiles?.splice(imageIndex, 1);
    newVariants[variantIndex].variantImagePreviews?.splice(imageIndex, 1);

    setFormData({ ...formData, variants: newVariants });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate thông tin chính
    if (
      !formData.name ||
      !formData.brand ||
      !formData.categoryId ||
      !formData.basePrice
    ) {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm.');
      return;
    }

    // Validate variants
    if (
      formData.variants.some(
        (v) =>
          !v.color ||
          v.sizes.length === 0 ||
          v.sizes.some((s) => !s.price || !s.stock)
      )
    ) {
      alert(
        'Vui lòng kiểm tra màu sắc, size, giá và tồn kho của từng biến thể.'
      );
      return;
    }

    // Validate duplicate colors
    const colorList = formData.variants.map((v) => v.color);
    if (new Set(colorList).size !== colorList.length) {
      alert('Có màu sắc bị trùng. Vui lòng kiểm tra lại.');
      return;
    }

    // Validate duplicate sizes each variant
    for (let v of formData.variants) {
      const sizeList = v.sizes.map((s) => s.size);
      if (new Set(sizeList).size !== sizeList.length) {
        alert(`Có size trùng trong màu ${v.color}.`);
        return;
      }
    }

    // Mỗi variant phải có đúng 3 ảnh
    for (let v of formData.variants) {
      if (!v.variantImagePreviews || v.variantImagePreviews.length < 3) {
        alert(`Biến thể màu ${v.color || '(chưa chọn màu)'} phải có đủ 3 ảnh!`);
        return;
      }
    }

    // Tạo new product gửi lên BE
    const newProduct: Product = {
      productId: product?.productId || 0,
      name: formData.name,
      title: formData.title,
      brand: formData.brand,
      categoryId: parseInt(formData.categoryId),
      description: formData.description,
      imageProduct: formData.imageProduct,
      basePrice: parseFloat(formData.basePrice),
      variants: formData.variants.map((variant) => ({
        color: variant.color,
        images: variant.images,
        sizes: variant.sizes.map((size) => ({
          size: size.size,
          price: parseFloat(size.price.toString()),
          stock: size.stock,
          sku: size.sku,
        })),
        sku: variant.sku,
      })),
    };

    const variantFiles = formData.variants.map((variant) => ({
      color: variant.color,
      imageFiles: variant.variantImageFiles?.map((file) => file) || [],
      imageRemoved: variant.variantRemoveUrls?.map((preview) => preview) || [],
    }));

    onSave(newProduct, variantFiles, formData.imageFile ?? undefined);
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { color: '', images: [], sizes: [] }],
    });
  };

  const removeVariant = (index: number) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: newVariants });
  };

  const updateVariant = (
    index: number,
    field: keyof ColorVariant,
    value: any
  ) => {
    const newVariants = [...formData.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setFormData({ ...formData, variants: newVariants });
  };

  const addSize = (variantIndex: number) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].sizes = [
      ...newVariants[variantIndex].sizes,
      { size: '', sku: '', price: 0, stock: 0 },
    ];
    setFormData({ ...formData, variants: newVariants });
  };

  const removeSize = (variantIndex: number, sizeIndex: number) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].sizes = newVariants[variantIndex].sizes.filter(
      (_, i) => i !== sizeIndex
    );
    setFormData({ ...formData, variants: newVariants });
  };

  const updateSize = (
    variantIndex: number,
    sizeIndex: number,
    field: keyof SizeVariant,
    value: any
  ) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].sizes[sizeIndex] = {
      ...newVariants[variantIndex].sizes[sizeIndex],
      [field]: value,
    };
    setFormData({ ...formData, variants: newVariants });
  };

  // Check duplicate color
  const isDuplicateColor = (color: string, variantIndex: number) => {
    return formData.variants.some(
      (v, i) => i !== variantIndex && v.color === color
    );
  };

  // Check duplicate size inside variant
  const isDuplicateSize = (
    variantIndex: number,
    sizeValue: string,
    sizeIndex: number
  ) => {
    return formData.variants[variantIndex].sizes.some(
      (s, i) => i !== sizeIndex && s.size.toString() === sizeValue.toString()
    );
  };

  return (
    <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên sản phẩm
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thương hiệu
              </label>
              <select
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="input-base"
                required
              >
                <option value="">Chọn thương hiệu</option>
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục sản phẩm
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="input-base"
                required
              >
                <option value="">Chọn danh mục</option>
                {categories
                  .filter((c) => c.categoryId !== -1)
                  .map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.name}
                    </option>
                  ))}
              </select>
              {categories.filter((c) => c.categoryId !== -1).length === 0 && (
                <p className="text-sm text-red-500 mt-1">
                  Không có danh mục phù hợp
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá gốc (đ)
              </label>
              <input
                type="number"
                step="100"
                value={formData.basePrice}
                onChange={(e) =>
                  setFormData({ ...formData, basePrice: e.target.value })
                }
                className="input-base"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="input-base"
              placeholder="Nhập mô tả sản phẩm..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tải lên ảnh sản phẩm
            </label>
            {!formData.imageProduct ? (
              <label className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Nhấn vào để tải ảnh lên
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative inline-block">
                <img
                  src={formData.imageProduct}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Biến thể (Màu sắc & Kích cỡ)
              </label>
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Thêm biến thể</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.variants.map((variant, variantIndex) => (
                <div
                  key={variantIndex}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      Biến thể {variantIndex + 1}
                    </h4>
                    {formData.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(variantIndex)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Màu sắc
                      </label>
                      <select
                        value={variant.color}
                        onChange={(e) => {
                          const newColor = e.target.value;
                          if (isDuplicateColor(newColor, variantIndex)) {
                            alert(
                              `Màu "${newColor}" đã tồn tại ở biến thể khác!`
                            );
                            return;
                          }
                          updateVariant(variantIndex, 'color', newColor);
                        }}
                        className={`w-full border rounded-lg px-3 py-2 ${
                          isDuplicateColor(variant.color, variantIndex)
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300'
                        }`}
                      >
                        <option value="">Chọn màu</option>
                        {availableColors.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tải ảnh lên ({variant.variantImagePreviews?.length || 0}
                      /3)
                    </label>
                    <div className="space-y-3">
                      {(variant.variantImagePreviews?.length || 0) < 3 && (
                        <label className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer flex flex-col items-center justify-center">
                          <Upload className="w-6 h-6 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">
                            Nhấn vào để tải ảnh lên
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleVariantImageUpload(variantIndex, e)
                            }
                            className="hidden"
                          />
                        </label>
                      )}

                      {variant.variantImagePreviews &&
                        variant.variantImagePreviews.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {variant.variantImagePreviews.map(
                              (preview, imageIndex) => (
                                <div
                                  key={imageIndex}
                                  className="relative inline-block"
                                >
                                  <img
                                    src={preview}
                                    alt={`Preview ${imageIndex + 1}`}
                                    className="w-20 h-20 object-cover rounded-lg border-2 border-gray-300"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveVariantImage(
                                        variantIndex,
                                        imageIndex
                                      )
                                    }
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Kích cỡ
                      </label>
                      <button
                        type="button"
                        onClick={() => addSize(variantIndex)}
                        className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Thêm cỡ</span>
                      </button>
                    </div>
                    {variant.sizes.map((size, sizeIndex) => (
                      <div key={sizeIndex} className="flex space-x-4 mb-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cỡ
                          </label>
                          <select
                            value={size.size}
                            onChange={(e) => {
                              const newSize = e.target.value;
                              if (
                                isDuplicateSize(
                                  variantIndex,
                                  newSize,
                                  sizeIndex
                                )
                              ) {
                                alert(
                                  `Size ${newSize} đã tồn tại trong màu này!`
                                );
                                return;
                              }
                              updateSize(
                                variantIndex,
                                sizeIndex,
                                'size',
                                newSize
                              );
                            }}
                            className={`input-base ${
                              isDuplicateSize(
                                variantIndex,
                                size.size,
                                sizeIndex
                              )
                                ? 'border-red-500 bg-red-50'
                                : ''
                            }`}
                          >
                            <option value="">Chọn kích cỡ</option>
                            {availableSizes.map((sizeOption) => (
                              <option key={sizeOption} value={sizeOption}>
                                {sizeOption}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Giá tiền (đ)
                          </label>
                          <input
                            type="number"
                            step="100"
                            value={size.price}
                            onChange={(e) =>
                              updateSize(
                                variantIndex,
                                sizeIndex,
                                'price',
                                parseFloat(e.target.value)
                              )
                            }
                            className="input-base"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Số lượng tồn
                          </label>
                          <input
                            type="number"
                            value={size.stock}
                            onChange={(e) =>
                              updateSize(
                                variantIndex,
                                sizeIndex,
                                'stock',
                                parseInt(e.target.value)
                              )
                            }
                            className="input-base"
                          />
                        </div>
                        {variant.sizes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSize(variantIndex, sizeIndex)}
                            className="text-red-500 hover:text-red-600 transition-colors mt-6"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              {product ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
