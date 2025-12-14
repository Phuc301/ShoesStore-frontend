import { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User, LogOut } from 'lucide-react';
import Logo from '../common/Logo';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { logout } from '@/api';
import Toast from '../common/Toast';
import { userLogout } from '@/store/slices/user.slice';
import { addToCart, setCartId } from '@/store/slices/cart.slice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);

  const isLoggedIn = user.isAuthenticated;
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      const data = await logout({
        accessToken: user.account.access_token,
        refreshToken: user.account.refresh_token,
      });
      if (data?.success) {
        dispatch(userLogout());
        dispatch(addToCart({ total: 0 }));
        dispatch(setCartId({ cartId: null }));
        setTimeout(() => {
          navigate('/login');
        }, 100);
        setToast({ message: 'Logout successful', type: 'success' });
      }
    } catch (err) {
      setToast({ message: 'An error occurred', type: 'error' });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? 'text-orange-500'
                    : 'text-gray-700 hover:text-orange-500'
                }`
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? 'text-orange-500'
                    : 'text-gray-700 hover:text-orange-500'
                }`
              }
            >
              Sản phẩm
            </NavLink>

            {/* <NavLink
              to="/promotion"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? 'text-orange-500'
                    : 'text-gray-700 hover:text-orange-500'
                }`
              }
            >
              Khuyến mãi
            </NavLink> */}

            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? 'text-orange-500'
                    : 'text-gray-700 hover:text-orange-500'
                }`
              }
            >
              Giới thiệu
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? 'text-orange-500'
                    : 'text-gray-700 hover:text-orange-500'
                }`
              }
            >
              Liên hệ
            </NavLink>
          </nav>
          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="h-5 w-5 text-gray-700" />
            </button> */}
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative cursor-pointer"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.shoppingCart.total}
              </span>
            </button>

            {/* Login/Logout Button */}
            {isLoggedIn ? (
              <div className="relative group hidden md:block">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-[#FF6B35] overflow-hidden">
                    {user?.account.avatarUrl ? (
                      <img
                        src={user.account.avatarUrl}
                        alt={user.account.fullName}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-white font-semibold">
                        {user?.account.fullName?.charAt(0).toUpperCase() || (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.account.fullName}
                  </span>
                </button>

                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `flex items-center px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? 'text-[#FF6B35] bg-gray-100'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-[#FF6B35]'
                        }`
                      }
                    >
                      <User className="w-4 h-4 mr-3" />
                      Thông tin cá nhân
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#FF6B35]"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="hidden md:flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
              >
                <User className="h-4 w-4" />
                <span>Đăng nhập</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="py-4 space-y-2">
              <NavLink
                to="/"
                className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              >
                Trang chủ
              </NavLink>
              <NavLink
                to="/product"
                className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              >
                Sản phẩm
              </NavLink>
              {/* <NavLink
                to="/promotion"
                className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              >
                Khuyến mãi
              </NavLink> */}
              <NavLink
                to="/about-us"
                className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              >
                Giới thiệu
              </NavLink>
              <NavLink
                to="/contact"
                className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
              >
                Liên hệ
              </NavLink>
              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center px-4 py-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-[#FF6B35] overflow-hidden">
                        {user?.account.avatarUrl ? (
                          <img
                            src={user.account.avatarUrl}
                            alt={user.account.fullName}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <span className="text-white font-semibold">
                            {user?.account.fullName
                              ?.charAt(0)
                              .toUpperCase() || (
                              <User className="w-4 h-4 text-white" />
                            )}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {user.account.fullName}
                      </span>
                    </div>
                    <NavLink
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Thông tin cá nhân
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center justify-center mx-4 my-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    <User className="h-4 w-4 mr-2" />
                    <span>Đăng nhập</span>
                  </button>
                )}
              </div>
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
    </header>
  );
};

export default Header;
