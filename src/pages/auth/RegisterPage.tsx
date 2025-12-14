import React, { useState } from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import { meregCart, register } from '@/api';
import Toast from '@/components/common/Toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userLogin } from '@/store/slices/user.slice';
import { useDispatch } from 'react-redux';
import { withPageLoading } from '@/hoc/withPageLoading';
import { persistor } from '@/store/store';
import { setCartId } from '@/store/slices/cart.slice';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('ReturnUrl') || '/';
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(formData);
      if (data?.success) {
        setToast({ message: 'Registration successful', type: 'success' });
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false,
        });
        navigate('/login');
      } else {
        setToast({ message: 'Registration failed', type: 'error' });
      }
    } catch (err) {
      setToast({ message: 'An error occurred', type: 'error' });
    }
  };

  const handleSignInWithGoogle = async () => {
    const popup = window.open(
      `${import.meta.env.VITE_BASE_URL}/auth/google`,
      'GoogleLogin'
    );

    window.addEventListener('message', async function onMessage(event) {
      if (event.origin !== import.meta.env.VITE_URL) return;
      const { accessToken, refreshToken, user } = event.data;
      if (accessToken && user) {
        dispatch(userLogin({ accessToken, refreshToken, user }));
        await persistor.flush();
        const responseMergeCart = await meregCart();
        if (responseMergeCart?.success) {
          dispatch(setCartId({ total: responseMergeCart.data.cartId }));
        }
        popup?.close();
        window.removeEventListener('message', onMessage);
        navigate(returnUrl, { replace: true });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="lg:flex lg:min-h-[600px]">
        {/* Left Side - Image */}
        <div className="lg:flex-1 bg-gradient-to-br from-orange-50 via-white to-orange-50 p-8 lg:p-12 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#FF6B35] to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <div className="text-white text-4xl font-bold">S</div>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              Welcome to SoleStore
            </h2>
            <p className="text-gray-600 mb-6">
              Discover the latest trends in footwear and step up your style game
            </p>
            <div className="grid grid-cols-2 gap-4 opacity-60">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-full h-20 bg-gray-200 rounded mb-2"></div>
                <div className="text-xs text-gray-500">Premium Collection</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-full h-20 bg-gray-200 rounded mb-2"></div>
                <div className="text-xs text-gray-500">Latest Arrivals</div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side - Form */}
        <div className="lg:flex-1 p-8 lg:p-12">
          <RegisterForm
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            setShowPassword={setShowPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            handleSubmit={handleSubmit}
            handleSignInWithGoogle={handleSignInWithGoogle}
          />
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default withPageLoading(RegisterPage);
