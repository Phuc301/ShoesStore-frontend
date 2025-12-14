import React, { useState } from 'react';
import ResetForm from '@/components/auth/ResetForm';
import { resetPassword, sendResetPasswordEmail, verifyCode } from '@/api';
import Toast from '@/components/common/Toast';
import { withPageLoading } from '@/hoc/withPageLoading';

const ResetPage: React.FC = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  // Send email
  const handleSendEmail = async (email: string) => {
    try {
      const response = await sendResetPasswordEmail(email);
      if (!response.success) {
        throw new Error('Failed to send email');
      }
      return true;
    } catch (error) {
      setToast({ message: 'User not found with this email', type: 'error' });
      return false;
    }
  };
  // Verify OTP
  const handleVerifyOtp = async (otp: string) => {
    try {
      const response = await verifyCode(otp, 'reset_password');
      console.log(response);
      if (!response.success) {
        throw new Error('Invalid OTP');
      }
      return true;
    } catch (error) {
      console.error(error);
      setToast({ message: 'Invalid OTP', type: 'error' });
      return false;
    }
  };
  // Reset password
  const handleResetPassword = async (email: string, password: string) => {
    try {
      const response = await resetPassword(email, password);
      if (!response.success) {
        throw new Error('Failed to reset password');
      }
      setToast({ message: 'Password reset successfully', type: 'success' });
      return true;
    } catch (error) {
      setToast({ message: 'Failed to reset password', type: 'error' });
      return false;
    }
  };
  // Check if passwords match
  const passworIsMatch = (newPassword: string, confirmPassword: string) => {
    if (newPassword !== confirmPassword) {
      setToast({ message: 'Passwords do not match', type: 'error' });
      return false;
    }
    return true;
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
          <ResetForm
            sendEmail={handleSendEmail}
            verifyOtp={handleVerifyOtp}
            resetPassword={handleResetPassword}
            passworIsMatch={passworIsMatch}
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

export default withPageLoading(ResetPage);
