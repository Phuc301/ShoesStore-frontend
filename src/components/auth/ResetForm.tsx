import React, { useState, useEffect } from 'react';
import { Mail, ShieldCheck, Lock, EyeOff, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';

interface ResetFormProps {
  sendEmail: (email: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  resetPassword: (email: string, password: string) => Promise<boolean>;
  passworIsMatch: (newPassword: string, confirmPassword: string) => boolean;
}

const ResetForm: React.FC<ResetFormProps> = ({
  sendEmail,
  verifyOtp,
  resetPassword,
  passworIsMatch,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field: 'new' | 'confirm') => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  // Countdown for step 2
  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleResendOtp = async () => {
    await sendEmail(formData.email);
    setTimeLeft(300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      if (step === 1) {
        const isSent = await sendEmail(formData.email);
        if (isSent) {
          setStep(2);
          setTimeLeft(300);
        }
      } else if (step === 2) {
        if (timeLeft <= 0) {
          setError('OTP đã hết hạn, vui lòng gửi lại');
          return;
        }
        const isVerified = await verifyOtp(formData.otp);
        if (isVerified) {
          setStep(3);
        }
      } else if (step === 3) {
        const passwordsMatch = passworIsMatch(
          formData.newPassword,
          formData.confirmPassword
        );
        if (!passwordsMatch) {
          return;
        }
        const isReset = await resetPassword(
          formData.email,
          formData.newPassword
        );
        if (isReset) {
          setTimeout(() => {
            navigate('/login');
          }, 300);
        } else {
          setFormData({ ...formData, newPassword: '', confirmPassword: '' });
        }
      }
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {step === 1 && 'Đặt lại mật khẩu'}
          {step === 2 && 'Nhập mã xác thực'}
          {step === 3 && 'Tạo mật khẩu mới'}
        </h2>
        <p className="text-gray-600">
          {step === 1 && 'Nhập email để nhận mã OTP đặt lại mật khẩu'}
          {step === 2 && `Mã OTP đã gửi đến email: ${formData.email}`}
          {step === 3 && 'Nhập mật khẩu mới để hoàn tất'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-base pl-10 pr-3 py-3 "
                placeholder="Nhập email của bạn"
                required
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mã OTP
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                disabled={timeLeft <= 0}
                className="input-base pl-10 pr-3 py-3 "
                placeholder="Nhập mã OTP"
                required
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-sm">
              <span className="text-gray-500">
                {timeLeft > 0
                  ? `OTP sẽ hết hạn sau ${formatTime(timeLeft)}`
                  : 'OTP đã hết hạn'}
              </span>
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-[#FF6B35] hover:text-orange-600 font-medium"
              >
                Gửi lại OTP
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showPassword.new ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="input-base px-3 py-3"
                  placeholder="Nhập mật khẩu mới"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword.new ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-base px-3 py-3"
                  placeholder="Nhập lại mật khẩu mới"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword.confirm ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </>
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#FF6B35] text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition cursor-pointer"
        >
          {step === 1 && 'Gửi OTP'}
          {step === 2 && 'Xác thực OTP'}
          {step === 3 && 'Đặt lại mật khẩu'}
        </button>
      </form>
      <Loading show={loading} />
    </div>
  );
};

export default ResetForm;
