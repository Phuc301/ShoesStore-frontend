import CustomerRow from './CustomerRow';

interface Props {
  customers: any[];
  handleViewCustomer: (customer: any) => void;
  handleEditCustomer: (customer: any) => void;
  handleToggleStatus: (id: number) => void;
}

const CustomerTable: React.FC<Props> = ({
  customers,
  handleViewCustomer,
  handleToggleStatus,
  handleEditCustomer
}) => {
  return (
    <div className="bg-white rounded-lg border overflow-hidden mb-3">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {[
              'Khách hàng',
              'Liên hệ',
              'Điểm tích lũy',
              'Trạng thái',
              'Ngày đăng ký',
              'Thao tác',
            ].map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y">
          {customers.map((c) => (
            <CustomerRow
              key={c.userId}
              customer={c}
              handleViewCustomer={handleViewCustomer}
              handleToggleStatus={handleToggleStatus}
              handleEditCustomer={handleEditCustomer}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
