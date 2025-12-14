import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import SearchAndFilter from './PromotionManagement/SearchAndFilter';
import PromotionTable from './PromotionManagement/PromotionTable';
import PromotionStats from './PromotionManagement/PromotionStats';
import PromotionModal from './PromotionManagement/PromotionModal';
import Pagination from './Pagination';
import Header from './PromotionManagement/Header';
import Loading from '../common/Loading';
import Toast from '../common/Toast';

import {
  fetchVouchers,
  getVoucherById,
  createVoucher,
  toggleVoucherStatus,
  updateVoucher,
  fetchVoucherUsages,
  checkCodeValid,
} from '@/api';

const PromotionManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>(
    'create'
  );

  const [selectedPromotion, setSelectedPromotion] = useState<any | null>(null);

  const [vouchers, setVouchers] = useState<any[]>([]);
  const [vouchersUsed, setVouchersUsed] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const loadVouchers = async () => {
    try {
      setLoading(true);

      const data = await fetchVouchers({
        page: currentPage,
        limit,
        isShowAll: true,
      });

      const usedVouchers = await fetchVoucherUsages();
      setVouchersUsed(usedVouchers);

      setVouchers(data.data || []);
      setTotalItems(data.pagination.total || 0);
      setTotalPages(data.pagination.totalPages || 1);
    } catch (err: any) {
      setError(err.message || 'Failed to load vouchers');
    } finally {
      setLoading(false);
    }
  };

  const filteredVouchers = vouchers.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async (data: any) => {
    try {
      setLoading(true);

      const check = await checkCodeValid(data.code);
      console.log('Check code:', check);

      if (check?.data === false) {
        setToast({
          message: 'Mã voucher đã tồn tại hoặc không hợp lệ!',
          type: 'error',
        });
        // alert('Mã voucher đã tồn tại hoặc không hợp lệ!');
        return;
      }

      const payload = {
        ...data,
        discountType: data.discountType.toLowerCase(),
        discountValue: Number(data.discountValue),
        usageLimit: Number(data.usageLimit),
        minOrderValue: Number(data.minOrderValue),
        maxDiscountValue: Number(data.maxDiscountValue),
      };

      await createVoucher(payload);

      // alert('Tạo voucher thành công!');
      setToast({
        message: 'Tạo voucher thành công!',
        type: 'success',
      });
      setShowModal(false);
      await loadVouchers();
    } catch (err: any) {
      console.error(err);
      // alert(err?.response?.data?.message || 'Lỗi khi tạo voucher');
      setToast({
        message: 'Lỗi khi tạo voucher',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      if (!selectedPromotion?.voucherId) {
        alert('Không tìm thấy voucherId!');
        return;
      }

      setLoading(true);

      if (data.code !== selectedPromotion.code) {
        const check = await checkCodeValid(data.code);
        console.log('Check code:', check);

        if (check?.data === false) {
          // alert('Mã voucher đã tồn tại hoặc không hợp lệ!');
          setToast({
            message: 'Mã voucher đã tồn tại hoặc không hợp lệ!',
            type: 'error',
          });
          return;
        }
      }

      const payload = {
        ...data,
        discountType: data.discountType.toLowerCase(),
        discountValue: Number(data.discountValue),
        usageLimit: Number(data.usageLimit),
        minOrderValue: Number(data.minOrderValue),
        maxDiscountValue: Number(data.maxDiscountValue),
      };

      await updateVoucher(selectedPromotion.voucherId, payload);

      // alert('Cập nhật voucher thành công!');
      setToast({
        message: 'Cập nhật voucher thành công!',
        type: 'success',
      });
      setShowModal(false);
      await loadVouchers();
    } catch (err: any) {
      console.error(err);
      // alert(err?.response?.data?.message || 'Lỗi cập nhật voucher');
      setToast({
        message: 'Lỗi cập nhật voucher',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      setLoading(true);
      await toggleVoucherStatus(id);
      await loadVouchers();
    } catch (err: any) {
      setError(err.message || 'Failed to toggle status');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setSelectedPromotion(null);
    setModalMode('create');
    setShowModal(true);
  };

  const openEdit = (voucher: any) => {
    setSelectedPromotion(voucher);
    setModalMode('edit');
    setShowModal(true);
  };

  const openView = (voucher: any) => {
    setSelectedPromotion(voucher);
    setModalMode('view');
    setShowModal(true);
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

  useEffect(() => {
    loadVouchers();
  }, [currentPage, limit]);

  return (
    <div className="space-y-3">
      <div className="sticky top-0 z-50 bg-white shadow-sm space-y-4 px-4 py-2 rounded-xl">
        <Header onAdd={openCreate} total={totalItems} />

        <SearchAndFilter value={searchTerm} onChange={setSearchTerm} />

        <PromotionStats
          countActive={vouchers.filter((v) => v.isActive === true).length}
          countUsage={vouchersUsed.length}
          countExpired={vouchers.filter((v) => v.isActive === false).length}
        />

        <div className="flex justify-between items-end px-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Hiển thị mỗi trang:</span>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="border rounded-md px-2 py-1 text-sm"
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

      {/* DANH SÁCH MÃ KHUYẾN MÃI */}
      {!loading &&
        !error &&
        (filteredVouchers.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            Không tìm thấy mã khuyến mãi nào.
          </p>
        ) : (
          <PromotionTable
            vouchers={filteredVouchers}
            handleEditVoucher={openEdit}
            handleViewVoucher={openView}
            handleToggleStatus={handleToggleStatus}
          />
        ))}

      {/* MODAL */}
      {showModal && (
        <PromotionModal
          mode={modalMode}
          promotion={selectedPromotion}
          onClose={() => setShowModal(false)}
          onSave={modalMode === 'create' ? handleCreate : handleUpdate}
        />
      )}
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

export default PromotionManagement;
