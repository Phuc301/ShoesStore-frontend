import React, { useState, useEffect } from 'react';
import Header from './CustomerManagement/Header';
import SearchAndFilter from './CustomerManagement/SearchAndFilter';
import CustomerTable from './CustomerManagement/CustomerTable';
import Pagination from './Pagination';
import Loading from '../common/Loading';
import Toast from '../common/Toast';
import {
  fetchUsers,
  fetchUserDetails,
  deleteUser,
  updateProfileUserByAdmin,
  updateAddress,
} from '@/api';
import CustomerModal from './CustomerManagement/CustomerModal';
import DeletedCustomerModal from './CustomerManagement/DeletedCustomerModal';
import CustomerDetailModal from './CustomerManagement/CustomerDetailModal';

const CustomerManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(6);
  const [totalItems, setTotalItems] = useState(0);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };
  const loadUsers = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit,
        isActive: true,
      };

      const data = await fetchUsers(params);
      const activeUsers = data.data;

      setUsers(activeUsers);
      setTotalItems(data.total || 0);
      setTotalPages(data.totalPages || 1);

    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCustomer = (customer: any) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const handleSaveCustomer = async (updated: any) => {
    try {
      const {
        _id,
        __v,
        createdAt,
        updatedAt,
        userId,
        email,
        address,
        ...userData
      } = updated;

      const updatedUser = await updateProfileUserByAdmin(userId, userData);

      if (address && address.addressId) {
        await updateAddress(address.addressId, address);
      } else if (address) {
        // await addNewAddress({
        //   userId,
        //   ...address,
        // });
      }

      setToast({
        message: 'Cập nhật thành công',
        type: 'success',
      });

      setShowModal(false);
      setEditingCustomer(null);
      loadUsers();
    } catch (err: any) {
      console.error('Cập nhật thất bại:', err);
      setToast({
        message: err.message || 'Cập nhật thông tin thất bại',
        type: 'error',
      });
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleOpenDeletedModal = () => setIsDeletedModalOpen(true);
  const handleCloseDeletedModal = () => setIsDeletedModalOpen(false);

  const filteredCustomers = users.filter(
    (v) =>
      v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  useEffect(() => {
    loadUsers();
  }, [currentPage, limit]);



  const handleToggleStatus = async (id: number) => {
    setLoading(true);
    await deleteUser(id);
    await loadUsers();
  };

  const banCusStatus = async (id: number) => {
    try {
      await handleToggleStatus(id);
      setToast({
        message: 'Vô hiệu hóa thành công',
        type: 'success',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to toggle user status');
      setToast({
        message: 'Vô hiệu hóa thất bại',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const restoreCusStatus = async (id: number) => {
    try {
      await handleToggleStatus(id);
      setToast({
        message: 'Khôi phục thành công',
        type: 'success',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to toggle user status');
      setToast({
        message: 'Khôi phục thất bại',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading show />;
  if (error)
    return <div className="text-center py-4 text-red-500">Lỗi: {error}</div>;

  return (
    <div className="space-y-3">
      <div className="sticky top-0 z-50 bg-white shadow-sm space-y-4 px-4 py-2 rounded-xl">
        <Header handleOpenDeleted={handleOpenDeletedModal} total={totalItems} />

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="flex justify-between items-end px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Hiển thị mỗi trang:</span>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="border rounded-md px-2 py-1 text-sm "
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">
              trong tổng số {totalItems}
            </span>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {showModal && (
        <CustomerModal
          customer={editingCustomer}
          onClose={() => setShowModal(false)}
          onSave={handleSaveCustomer}
        />
      )}
      {!loading && !error && filteredCustomers.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          Không tìm thấy khách hàng nào.
        </p>
      )}
      {!loading && !error && filteredCustomers.length > 0 && (
        <CustomerTable
          customers={filteredCustomers}
          handleViewCustomer={handleViewCustomer}
          handleToggleStatus={banCusStatus}
          handleEditCustomer={handleEditCustomer}
        />
      )}
      {isDeletedModalOpen && (
        <DeletedCustomerModal
          isOpen={isDeletedModalOpen}
          onClose={handleCloseDeletedModal}
          handleToggleStatus={restoreCusStatus}
        />
      )}
      <CustomerDetailModal
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        customer={selectedCustomer}
      />
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

export default CustomerManagement;
