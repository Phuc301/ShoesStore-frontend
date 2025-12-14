import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '@/components/user/Breadcrumb';
import PaymentMethod from '@/components/cart/PaymentMethod';
import OrderSummary from '@/components/cart/OrderSummary';
import PlaceOrderButton from '@/components/cart/PlaceOrderButton';
import GuestInfoForm from '@/components/cart/GuestInfoForm';
import type {
  Address,
  AddressInfoFormRef,
  AddressParams,
  GuestInfo,
  GuestInfoFormRef,
} from '@/interfaces/auth.interface';
import { useAuth } from '@/hooks/userAuth.hooks';
import {
  checkCodeValid,
  checkStock,
  createOrderByCustomer,
  createOrderByGuest,
  getAddress,
  getCartItem,
  removeCartItem,
  updateCartItem,
  type CheckStockResponse,
} from '@/api';
import AddressSelector from '@/components/cart/AddressSelector';
import { useCart } from '@/hooks/useCart.hooks';
import type { CartItem, CartItemParams } from '@/interfaces/cart.interface';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cart.slice';
import Toast from '@/components/common/Toast';
import AddressForm from '@/components/cart/AddressForm';
import type {
  OrderByCustomerParams,
  OrderByGuestParams,
  OrderItem,
} from '@/interfaces/order.interface';
import { useNavigate } from 'react-router-dom';
import { withPageLoading } from '@/hoc/withPageLoading';
import Loading from '@/components/common/Loading';
import { userLoyalty } from '@/store/slices/user.slice';

const CartPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const guestInfoRef = useRef<GuestInfoFormRef>(null);
  const addressRef = useRef<AddressInfoFormRef>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
  const [showAddress, setShowAddress] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(
    isAuthenticated ? false : true
  );
  const { shoppingCart } = useCart();
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [selectedVoucher, setSelectedVoucher] = useState<{
    voucherId: number;
    code: string;
    discount: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [redeemedPoints, setRedeemedPoints] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      getAddressList();
    }
    if (shoppingCart?.cartId) {
      fetchCartItems();
    }
  }, []);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const voucherDiscount = selectedVoucher?.discount || 0;
  const pointsDiscount = redeemedPoints * 1000;
  const totalDiscount = voucherDiscount + pointsDiscount;
  const tax = subtotal * 0.1;
  const total = subtotal - totalDiscount + tax;

  const breadcrumbItems = [
    { label: 'Giỏ hàng', href: '/cart' },
    { label: 'Thanh toán' },
  ];

  const handleAddressSelect = (addressId: number) => {
    setSelectedAddressId(addressId);
  };

  // Fetch cart items
  const fetchCartItems = async () => {
    const response = await getCartItem(shoppingCart.cartId!);
    if (response.success) {
      setCartItems(response.data);
    }
  };

  const handleAddNewAddress = () => {
    setShowAddressForm(true);
  };

  const handleSaveAddress = (addressData: any) => {
    const newAddress = {
      ...addressData,
      addressId: addresses.length + 1,
    };
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressId(newAddress.addressId);
    setShowAddressForm(false);
  };

  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };
  // Update quantity
  const handleQuantityChange = async (itemId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      const itemToUpdate = cartItems.find((item) => item.cartItemId === itemId);
      if (!itemToUpdate) return;
      const updatedItem: CartItemParams = {
        ...itemToUpdate,
        quantity,
      };
      await updateCartItem(itemId, updatedItem);
      setCartItems((prev) =>
        prev.map((item) =>
          item.cartItemId === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      setToast({ message: 'Thất bại để cập nhật giỏ hàng', type: 'error' });
    }
  };
  // Remove cart item
  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeCartItem(itemId);
      setCartItems((prev) => prev.filter((item) => item.cartItemId !== itemId));
      setToast({ message: 'Sản phẩm được xoá khỏi giỏ hàng', type: 'success' });
      dispatch(addToCart({ total: cartItems.length - 1 }));
    } catch (error) {
      setToast({ message: 'Thất bại để xoá khỏi giỏ hàng', type: 'error' });
    }
  };
  // Handle place order
  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      if (!cartItems.length) {
        setToast({
          message: 'Vui lòng chọn sản phẩm trên giỏ hàng',
          type: 'error',
        });
        return;
      }

      if (selectedVoucher) {
        const isVoucherValid = await checkCodeValid(
          selectedVoucher.code.toLowerCase()
        );
        if (!isVoucherValid.data) {
          setToast({
            message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn sử dụng',
            type: 'error',
          });
          return;
        }
      }

      const isValidGuestInfo = guestInfoRef.current?.validate() ?? false;
      const isValidAddress = addressRef.current?.validate() ?? false;
      if (!isValidGuestInfo && !isValidAddress && !isAuthenticated) {
        setToast({
          message: 'Vui liệu nhập thông tin khách hàng với điểm giao hàng',
          type: 'error',
        });
        return;
      }
      if (!isValidGuestInfo && !isAuthenticated) {
        setToast({
          message: 'Vui lòng nhập thông tin khách hàng',
          type: 'error',
        });
        return;
      }
      if (!isValidAddress && !isAuthenticated) {
        setToast({
          message: 'Vui lý nhập điểm giao hàng',
          type: 'error',
        });
        return;
      }
      if (!selectedAddressId && isAuthenticated) {
        setToast({
          message: 'Vui lòng chọn điểm giao hàng',
          type: 'error',
        });
        return;
      }
      const addressInfo: Partial<AddressParams> = {
        ...(addressRef?.current?.data || {}),
      };
      const guestInfo: Partial<GuestInfo> = {
        ...(guestInfoRef?.current?.data || {}),
      };
      const orderItems: OrderItem[] = cartItems.map((item) => ({
        productId: item.productId,
        productName: item.name,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      }));

      // Check all product availability
      const checkStockResponse = await checkStock(
        orderItems.map((item) => ({ sku: item.sku, quantity: item.quantity }))
      );

      const outOfStockItems = checkStockResponse
        .filter((item: CheckStockResponse) => !item.available)
        .map((item: CheckStockResponse) => {
          const product = orderItems.find((i) => i.sku === item.sku);
          return product ? product.productName : item.sku;
        });

      if (outOfStockItems.length > 0) {
        setToast({
          message: `Sản phẩm đã hết hàng: ${outOfStockItems.join(', ')}`,
          type: 'error',
        });
        return;
      }

      const orderData = {
        subtotal,
        tax,
        totalAmount: total,
        shippingFee: 0,
        voucherId: selectedVoucher?.voucherId,
        voucherDiscount: selectedVoucher?.discount,
        ...(isAuthenticated && { addressId: selectedAddressId }),
        ...(isAuthenticated && { pointsUsed: redeemedPoints }),
        ...(isAuthenticated && { pointsDiscount: redeemedPoints * 1000 }),
      };
      let response = null;
      if (isAuthenticated) {
        const orderParams: OrderByCustomerParams = {
          cartId: shoppingCart.cartId || 0,
          paymenMethod: selectedPaymentMethod,
          orderData,
          items: orderItems,
        };
        response = await createOrderByCustomer(orderParams);
      } else {
        const orderParams: OrderByGuestParams = {
          cartId: shoppingCart.cartId || 0,
          paymenMethod: selectedPaymentMethod,
          orderData,
          guestInfo,
          items: orderItems,
          addressInfo,
        };
        response = await createOrderByGuest(orderParams);
      }

      if (response.success) {
        setToast({ message: 'Đơn hàng được tạo', type: 'success' });
        dispatch(addToCart({ total: 0 }));
        isAuthenticated &&
          dispatch(userLoyalty({ loyaltyPoints: redeemedPoints }));
        if (response.data) {
          if (selectedPaymentMethod === 'cod') {
            navigate(
              `/checkout-success?orderId=${response.data.order.orderId}&paymentMethod=${selectedPaymentMethod}`
            );
          } else {
            window.location.href = response.data.paymentUrl;
          }
        }
      } else {
        navigate(`/checkout-fail?errorType=system`);
      }
    } catch {
      setToast({
        message: 'Tạo đơn hàng thất bại do lỗi hệ thống. Vui lòng thử lại sau.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  //  Get user's address
  const getAddressList = async () => {
    try {
      const response = await getAddress();
      setAddresses(response.data);
      return response;
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleShowAddressForm = () => {
    setShowAddressForm(false);
  };
  return (
    <div
      className={`${
        cartItems.length > 0 ? 'min-h-screen bg-gray-50' : 'bg-gray-50'
      }`}
    >
      {' '}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thanh toán</h1>
          <p className="text-gray-600">
            Hoàn tất đơn hàng của bạn bằng cách cung cấp thông tin giao hàng và
            thanh toán.
          </p>
        </div>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-10 text-center">
            <img
              src="https://res.cloudinary.com/deuyrsv65/image/upload/v1760804590/ChatGPT_Image_23_21_00_18_thg_10_2025_ktky1o.png"
              alt="Empty Cart"
              className="w-48 h-48 mb-6"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-gray-500 mb-6">
              Hãy thêm sản phẩm yêu thích để bắt đầu mua sắm nhé!
            </p>
            <button
              onClick={() => navigate('/product')}
              className="bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e85b28] transition"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Shipping & Payment */}
            <div className="lg:col-span-2 space-y-8">
              {/* Guest Infor */}
              {!isAuthenticated && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <GuestInfoForm ref={guestInfoRef} />
                </div>
              )}
              {/* Shipping Address */}
              {showAddress && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  {showAddressForm ? (
                    <AddressForm
                      addresses={addresses}
                      handleShowAddressForm={handleShowAddressForm}
                      ref={addressRef}
                    />
                  ) : (
                    <AddressSelector
                      addresses={addresses}
                      selectedAddressId={selectedAddressId}
                      onAddressSelect={handleAddressSelect}
                      onAddNewAddress={handleAddNewAddress}
                    />
                  )}
                </div>
              )}
              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <PaymentMethod
                  selectedMethod={selectedPaymentMethod}
                  onMethodSelect={handlePaymentMethodSelect}
                />
              </div>
            </div>
            {/* Right Column - Order Summary & Place Order */}
            <div className="lg:col-span-1 space-y-6">
              <OrderSummary
                cartItems={cartItems}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
                setToast={setToast}
                onVoucherChange={setSelectedVoucher}
                onPointsChange={setRedeemedPoints}
              />
              <PlaceOrderButton total={total} onPlaceOrder={handlePlaceOrder} />
            </div>
          </div>
        )}
      </div>
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

export default withPageLoading(CartPage);
