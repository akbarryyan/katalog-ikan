import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Download,
  Calendar,
  Phone,
  MapPin,
  Package,
  DollarSign,
} from "lucide-react";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmModal from "../components/ConfirmModal";
import Modal from "../components/Modal";
// import axios from 'axios';
// import { API_ENDPOINTS } from '../config/api';

// Interface untuk Transaction
interface Transaction {
  id: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: TransactionItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
  orderDate: string;
  deliveryDate?: string;
  notes?: string;
  whatsappOrderId?: string;
}

interface TransactionItem {
  id: number;
  ikanId: number;
  ikanName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface FormTransaction {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
  deliveryDate: string;
  notes: string;
}

const Transactions: React.FC = () => {
  // State management
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | Transaction["status"]
  >("all");
  const [paymentFilter, setPaymentFilter] = useState<
    "all" | Transaction["paymentStatus"]
  >("all");
  const [dateFilter, setDateFilter] = useState("");

  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Form state
  const [formData, setFormData] = useState<FormTransaction>({
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    status: "pending",
    paymentStatus: "unpaid",
    deliveryDate: "",
    notes: "",
  });

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock data - nanti akan diganti dengan API call
      const mockTransactions: Transaction[] = [
        {
          id: 1,
          customerName: "Ahmad Wijaya",
          customerPhone: "081234567890",
          customerAddress: "Jl. Sudirman No. 123, Jakarta",
          items: [
            {
              id: 1,
              ikanId: 1,
              ikanName: "Ikan Bawal",
              quantity: 2,
              price: 45000,
              subtotal: 90000,
            },
            {
              id: 2,
              ikanId: 2,
              ikanName: "Ikan Gurame",
              quantity: 1,
              price: 65000,
              subtotal: 65000,
            },
          ],
          totalAmount: 155000,
          status: "confirmed",
          paymentStatus: "paid",
          orderDate: "2024-01-15T10:30:00Z",
          deliveryDate: "2024-01-16T14:00:00Z",
          notes: "Pengiriman sore hari",
          whatsappOrderId: "WA001",
        },
        {
          id: 2,
          customerName: "Siti Nurhaliza",
          customerPhone: "082345678901",
          customerAddress: "Jl. Merdeka No. 456, Bandung",
          items: [
            {
              id: 3,
              ikanId: 3,
              ikanName: "Ikan Nila",
              quantity: 3,
              price: 35000,
              subtotal: 105000,
            },
          ],
          totalAmount: 105000,
          status: "pending",
          paymentStatus: "unpaid",
          orderDate: "2024-01-15T15:20:00Z",
          notes: "Mohon konfirmasi ketersediaan",
        },
      ];

      setTransactions(mockTransactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Gagal mengambil data transaksi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.customerPhone.includes(searchTerm) ||
      transaction.id.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || transaction.paymentStatus === paymentFilter;

    let matchesDate = true;
    if (dateFilter) {
      const orderDate = new Date(transaction.orderDate)
        .toISOString()
        .split("T")[0];
      matchesDate = orderDate === dateFilter;
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  // Handle view transaction
  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsViewModalOpen(true);
  };

  // Handle edit transaction
  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setFormData({
      customerName: transaction.customerName,
      customerPhone: transaction.customerPhone,
      customerAddress: transaction.customerAddress,
      status: transaction.status,
      paymentStatus: transaction.paymentStatus,
      deliveryDate: transaction.deliveryDate
        ? transaction.deliveryDate.split("T")[0]
        : "",
      notes: transaction.notes || "",
    });
    setIsEditModalOpen(true);
  };

  // Handle delete transaction
  const handleDeleteTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  // Submit edit
  const handleSubmitEdit = async () => {
    if (!selectedTransaction) return;

    try {
      // Mock update - nanti akan diganti dengan API call
      const updatedTransactions = transactions.map((t) =>
        t.id === selectedTransaction.id
          ? {
              ...t,
              ...formData,
              deliveryDate: formData.deliveryDate
                ? new Date(formData.deliveryDate).toISOString()
                : undefined,
            }
          : t
      );
      setTransactions(updatedTransactions);
      setIsEditModalOpen(false);
      setSelectedTransaction(null);
    } catch (err) {
      console.error("Error updating transaction:", err);
      setError("Gagal mengupdate transaksi");
    }
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedTransaction) return;

    try {
      // Mock delete - nanti akan diganti dengan API call
      const updatedTransactions = transactions.filter(
        (t) => t.id !== selectedTransaction.id
      );
      setTransactions(updatedTransactions);
      setIsDeleteModalOpen(false);
      setSelectedTransaction(null);
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError("Gagal menghapus transaksi");
    }
  };

  // Export transactions
  const handleExportTransactions = () => {
    // Mock export functionality
    console.log("Exporting transactions...");
  };

  // Status badge component
  const StatusBadge: React.FC<{ status: Transaction["status"] }> = ({
    status,
  }) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    const statusLabels = {
      pending: "Menunggu",
      confirmed: "Dikonfirmasi",
      shipped: "Dikirim",
      delivered: "Selesai",
      cancelled: "Dibatalkan",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
      >
        {statusLabels[status]}
      </span>
    );
  };

  // Payment status badge
  const PaymentBadge: React.FC<{ status: Transaction["paymentStatus"] }> = ({
    status,
  }) => {
    const statusColors = {
      unpaid: "bg-red-100 text-red-800",
      paid: "bg-green-100 text-green-800",
      refunded: "bg-gray-100 text-gray-800",
    };

    const statusLabels = {
      unpaid: "Belum Bayar",
      paid: "Lunas",
      refunded: "Refund",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
      >
        {statusLabels[status]}
      </span>
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Layout
      user={{ email: "admin@ikanoni.com" }}
      currentRoute="transactions"
      onLogout={() => {}}
      onNavigate={() => {}}
    >
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Manage Transaksi
          </h1>
          <p className="text-gray-600">Kelola semua transaksi pesanan ikan</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Filters and Search */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama, telepon, atau ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as typeof statusFilter)
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="confirmed">Dikonfirmasi</option>
              <option value="shipped">Dikirim</option>
              <option value="delivered">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>

            {/* Payment Filter */}
            <select
              value={paymentFilter}
              onChange={(e) =>
                setPaymentFilter(e.target.value as typeof paymentFilter)
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Pembayaran</option>
              <option value="unpaid">Belum Bayar</option>
              <option value="paid">Lunas</option>
              <option value="refunded">Refund</option>
            </select>

            {/* Date Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Export Button */}
            <button
              onClick={handleExportTransactions}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Transaksi</p>
                <p className="text-2xl font-bold text-gray-900">
                  {transactions.length}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Menunggu Konfirmasi</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {transactions.filter((t) => t.status === "pending").length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Selesai</p>
                <p className="text-2xl font-bold text-green-600">
                  {transactions.filter((t) => t.status === "delivered").length}
                </p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Penjualan</p>
                <p className="text-2xl font-bold text-green-600">
                  Rp{" "}
                  {transactions
                    .filter((t) => t.paymentStatus === "paid")
                    .reduce((sum, t) => sum + t.totalAmount, 0)
                    .toLocaleString("id-ID")}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID & Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pembayaran
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          #{transaction.id} - {transaction.customerName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {transaction.customerPhone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {transaction.items.map((item, index) => (
                          <div key={item.id}>
                            {item.ikanName} x{item.quantity}
                            {index < transaction.items.length - 1 && ", "}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Rp {transaction.totalAmount.toLocaleString("id-ID")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PaymentBadge status={transaction.paymentStatus} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.orderDate).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewTransaction(transaction)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditTransaction(transaction)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTransaction(transaction)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada transaksi ditemukan</p>
            </div>
          )}
        </div>

        {/* View Transaction Modal */}
        {isViewModalOpen && selectedTransaction && (
          <Modal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            title={`Detail Transaksi #${selectedTransaction.id}`}
          >
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">
                  Informasi Customer
                </h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Nama:</span>{" "}
                    {selectedTransaction.customerName}
                  </p>
                  <p className="flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    <span className="font-medium">Telepon:</span>{" "}
                    {selectedTransaction.customerPhone}
                  </p>
                  <p className="flex items-start">
                    <MapPin className="h-3 w-3 mr-1 mt-0.5" />
                    <span className="font-medium">Alamat:</span>{" "}
                    {selectedTransaction.customerAddress}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Detail Pesanan
                </h3>
                <div className="space-y-2">
                  {selectedTransaction.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <p className="font-medium">{item.ikanName}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x Rp{" "}
                          {item.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <p className="font-medium">
                        Rp {item.subtotal.toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total:</span>
                      <span>
                        Rp{" "}
                        {selectedTransaction.totalAmount.toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Status Pesanan
                  </p>
                  <StatusBadge status={selectedTransaction.status} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Status Pembayaran
                  </p>
                  <PaymentBadge status={selectedTransaction.paymentStatus} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-500">Tanggal Pesan</p>
                  <p>
                    {new Date(selectedTransaction.orderDate).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                </div>
                {selectedTransaction.deliveryDate && (
                  <div>
                    <p className="font-medium text-gray-500">Tanggal Kirim</p>
                    <p>
                      {new Date(
                        selectedTransaction.deliveryDate
                      ).toLocaleString("id-ID")}
                    </p>
                  </div>
                )}
              </div>

              {selectedTransaction.notes && (
                <div>
                  <p className="font-medium text-gray-500 mb-1">Catatan</p>
                  <p className="text-sm bg-gray-50 p-2 rounded">
                    {selectedTransaction.notes}
                  </p>
                </div>
              )}
            </div>
          </Modal>
        )}

        {/* Edit Transaction Modal */}
        {isEditModalOpen && selectedTransaction && (
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title={`Edit Transaksi #${selectedTransaction.id}`}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Customer
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    value={formData.customerPhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customerPhone: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat
                </label>
                <textarea
                  value={formData.customerAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customerAddress: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status Pesanan
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as FormTransaction["status"],
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Menunggu</option>
                    <option value="confirmed">Dikonfirmasi</option>
                    <option value="shipped">Dikirim</option>
                    <option value="delivered">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status Pembayaran
                  </label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        paymentStatus: e.target
                          .value as FormTransaction["paymentStatus"],
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="unpaid">Belum Bayar</option>
                    <option value="paid">Lunas</option>
                    <option value="refunded">Refund</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Pengiriman
                </label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catatan
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Catatan tambahan..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmitEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Hapus Transaksi"
          message={`Apakah Anda yakin ingin menghapus transaksi #${selectedTransaction?.id}? Tindakan ini tidak dapat dibatalkan.`}
          confirmText="Hapus"
          cancelText="Batal"
          type="danger"
        />
      </div>
    </Layout>
  );
};

export default Transactions;
