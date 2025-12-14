import React, { useEffect, useRef, useState } from 'react';
import { User, Lock, MapPin, Star, Package, Camera } from 'lucide-react';
import PersonalInfo from '@/components/auth/PersonalInfo';
import ChangePassword from '@/components/auth/ChangePassword';
import OrderHistory from '@/components/order/OrderHistory';
import AddressBook from '@/components/auth/AddressBook';
import PointsHistory from '@/components/auth/PointsHistory';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { userUpdateAvatar } from '@/store/slices/user.slice';
import { uploadAvatar } from '@/api';
import { useSearchParams } from 'react-router-dom';
import { TabKeyProfile } from '@/enums/tabKeyProfile.enum';
import type { Tab } from '@/interfaces/common/tabs.interface';

const ProfilePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabKey = searchParams.get('tabkeyProfile');
  const [activeTab, setActiveTab] = useState(
    tabKey || TabKeyProfile.PERSONAL_INFO
  );
  const user = useSelector((state: RootState) => state.user);
  const currentUser = {
    name: user.account.fullName,
    email: user.account.email,
    avatar: user.account.avatarUrl || null,
    memberSince: user.account.createdAt
      ? `Tháng ${new Date(user.account.createdAt).getMonth() + 1}, ${new Date(
          user.account.createdAt
        ).getFullYear()}`
      : '',
    points: user.account.loyaltyPoints || 0,
  };
  useEffect(() => {
    if (tabKey && tabKey !== activeTab) {
      setActiveTab(tabKey);
    }
  }, [tabKey]);
  // Define tabs
  const tabs: Tab[] = [
    {
      id: TabKeyProfile.PERSONAL_INFO,
      label: 'Thông tin cá nhân',
      icon: <User className="w-5 h-5" />,
      component: <PersonalInfo />,
    },
    {
      id: TabKeyProfile.CHANGE_PASSWORD,
      label: user.account.hasPassword ? 'Đổi mật khẩu' : 'Đặt mật khẩu',
      icon: <Lock className="w-5 h-5" />,
      component: <ChangePassword />,
    },
    {
      id: TabKeyProfile.ORDER_HISTORY,
      label: 'Lịch sử đơn hàng',
      icon: <Package className="w-5 h-5" />,
      component: <OrderHistory />,
    },
    {
      id: TabKeyProfile.ADDRESS_BOOK,
      label: 'Quản lý địa chỉ',
      icon: <MapPin className="w-5 h-5" />,
      component: <AddressBook />,
    },
    // {
    //   id: TabKeyProfile.POINTS_HISTORY,
    //   label: 'Lịch sử điểm tích lũy',
    //   icon: <Star className="w-5 h-5" />,
    //   component: <PointsHistory />,
    // },
  ];
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user.account.avatarUrl
  );
  const dispatch = useDispatch();
  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setAvatarUrl(previewUrl);
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('uploadType', 'avatar');
      if (user.account.avatarUrl) {
        formData.append('toDelete', user.account.avatarUrl);
      }
      try {
        dispatch(userUpdateAvatar({ avatarUrl: previewUrl }));
        const response = await uploadAvatar(formData);
        if (response.data && response.data.result) {
          const newAvatarUrl = response.data.result.added[0];
          setAvatarUrl(newAvatarUrl);
          dispatch(userUpdateAvatar({ avatarUrl: newAvatarUrl }));
        }
      } catch (error) {
        console.error('Upload avatar failed', error);
      }
    }
  };
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tabkeyProfile: tabId });
  };

  return (
    <div className=" bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center mr-3 bg-[#FF6B35] overflow-hidden">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user.account.fullName}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-white font-semibold text-3xl">
                  {user?.account.fullName?.charAt(0).toUpperCase() || (
                    <User className="w-8 h-8 text-white" />
                  )}
                </span>
              )}
              {/* Change avatar button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-3 right-2 bg-black/50 p-1 rounded-full hover:bg-black/70 transition"
              >
                <Camera className="w-3 h-3 text-white" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {currentUser.name}
              </h1>
              <p className="text-gray-600 mb-1">{currentUser.email}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500">
                <span>Thành viên từ {currentUser.memberSince}</span>
                <span className="hidden sm:block">•</span>
                <span className="flex items-center text-[#FF6B35] font-semibold">
                  <Star className="w-4 h-4 mr-1" />
                  {currentUser.points.toLocaleString()} điểm
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  flex items-center space-x-2 px-4 py-4 border-b-2 whitespace-nowrap text-sm font-medium transition-colors
                  ${
                    activeTab === tab.id
                      ? 'border-[#FF6B35] text-[#FF6B35]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default ProfilePage;
