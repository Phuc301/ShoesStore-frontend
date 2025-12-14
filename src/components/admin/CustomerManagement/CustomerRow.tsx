import { Eye, UserCheck, UserX, Mail, Phone, Edit } from 'lucide-react';
import { formatDate } from '@/utils/formatDate.util';
import { formatNumber } from '@/utils/formatNumber.util';
import { getAddressByEmail } from '@/api';
import { useEffect, useState } from 'react';
import AvatarCell from '../../common/AvatarCell';

interface Props {
  customer: any;
  handleViewCustomer: (customer: any) => void;
  handleEditCustomer: (customer: any) => void;
  handleToggleStatus: (id: number) => void;
}

const CustomerRow: React.FC<Props> = ({
  customer,
  handleViewCustomer,
  handleToggleStatus,
  handleEditCustomer,
}) => {
  const [address, setAddress] = useState('');

  const loadAddres = async () => {
    try {
      const data = await getAddressByEmail(customer.email);
      const cusAddress = data.data;

      setAddress(cusAddress[0].phone);
      // setError(err.message || 'Failed to load products');
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    loadAddres();
  }, []);

  return (
    <tr className="hover:bg-gray-50">
      {/* Customer Info */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <AvatarCell
            avatarUrl={customer.avatarUrl}
            defaultName={customer.fullName}
          />

          <div>
            <p className="font-medium text-gray-800">{customer.fullName}</p>
            <p className="text-gray-500 text-sm">
              ID khách hàng: {customer.userId}
            </p>
          </div>
        </div>
      </td>
      {/* Contact */}
      <td className="px-6 py-4 space-y-1 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          {customer.email}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          {address}
        </div>
      </td>
      {/* Total Spent */}
      <td className="px-6 py-4 font-medium">
        {formatNumber(customer.loyaltyPoints)}
      </td>
      {/* Status */}
      <td className="px-6 py-4">
        <div className="flex flex-col gap-2">
          {/* Đăng ký */}
          <span
            className={`
        px-4 py-1 text-xs font-semibold rounded-full text-center whitespace-nowrap
        ${
          customer.isRegistered
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-200 text-gray-700'
        }
      `}
          >
            {customer.isRegistered ? 'Đã đăng ký' : 'Chưa đăng ký'}
          </span>

          {/* Xác thực */}
          <span
            className={`
        px-4 py-1 text-xs font-semibold rounded-full text-center whitespace-nowrap
        ${
          customer.isVerified
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-200 text-gray-700'
        }
      `}
          >
            {customer.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
          </span>
        </div>
      </td>
      {/* Registered */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {formatDate(customer.createdAt)}
      </td>
      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewCustomer(customer)}
            className="text-gray-400 hover:text-blue-500 p-1"
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleEditCustomer(customer)}
            className="p-1 text-gray-400 hover:text-orange-500 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleToggleStatus(customer.userId)}
            className={`p-1 ${
              customer.status === 'Active'
                ? 'hover:text-red-500 text-gray-400'
                : 'hover:text-green-500 text-gray-400'
            }`}
          >
            {customer.status === 'Active' ? (
              <UserX className="w-4 h-4" />
            ) : (
              <UserCheck className="w-4 h-4" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CustomerRow;
