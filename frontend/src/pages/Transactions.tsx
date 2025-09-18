import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Download,
  Calendar,
  Package,
  DollarSign,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  BarChart3,
  Clock,
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
  items: TransactionItem[];
  totalAmount: number;
  totalProfit: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
  orderDate: string;
  deliveryDate?: string;
  notes?: string;
  whatsappOrderId?: string;
  stockReduced: boolean; // Flag untuk track apakah stok sudah dikurangi
}

interface TransactionItem {
  id: number;
  ikanId: number;
  ikanName: string;
  quantity: number;
  price: number; // Harga jual
  costPrice: number; // Harga modal/beli
  subtotal: number;
  profit: number; // Profit per item
  initialStock?: number; // Stok awal saat transaksi dibuat
  remainingStock?: number; // Sisa stok setelah transaksi
}

interface FormTransaction {
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
          items: [
            {
              id: 1,
              ikanId: 1,
              ikanName: "Ikan Bawal",
              quantity: 2,
              price: 45000, // Harga jual
              costPrice: 35000, // Harga modal
              subtotal: 90000,
              profit: 20000, // (45000-35000) * 2
              initialStock: 20,
              remainingStock: 18,
            },
            {
              id: 2,
              ikanId: 2,
              ikanName: "Ikan Gurame",
              quantity: 1,
              price: 65000,
              costPrice: 50000,
              subtotal: 65000,
              profit: 15000, // (65000-50000) * 1
              initialStock: 15,
              remainingStock: 14,
            },
          ],
          totalAmount: 155000,
          totalProfit: 35000,
          status: "delivered",
          paymentStatus: "paid",
          orderDate: "2024-01-15T10:30:00Z",
          deliveryDate: "2024-01-16T14:00:00Z",
          notes: "Pengiriman sore hari",
          whatsappOrderId: "WA001",
          stockReduced: true,
        },
        {
          id: 2,
          items: [
            {
              id: 3,
              ikanId: 3,
              ikanName: "Ikan Nila",
              quantity: 3,
              price: 35000,
              costPrice: 25000,
              subtotal: 105000,
              profit: 30000, // (35000-25000) * 3
              initialStock: 25,
              remainingStock: 22,
            },
          ],
          totalAmount: 105000,
          totalProfit: 30000,
          status: "confirmed",
          paymentStatus: "paid",
          orderDate: "2024-01-15T15:20:00Z",
          notes: "Mohon konfirmasi ketersediaan",
          stockReduced: true,
        },
        {
          id: 3,
          items: [
            {
              id: 4,
              ikanId: 1,
              ikanName: "Ikan Bawal",
              quantity: 1,
              price: 45000,
              costPrice: 35000,
              subtotal: 45000,
              profit: 10000,
              initialStock: 18,
              remainingStock: 17,
            },
          ],
          totalAmount: 45000,
          totalProfit: 10000,
          status: "pending",
          paymentStatus: "unpaid",
          orderDate: "2024-01-16T09:15:00Z",
          notes: "Pesan untuk besok pagi",
          stockReduced: false,
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
    const matchesSearch = transaction.id.toString().includes(searchTerm);

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

  // Handle stock reduction
  const handleStockReduction = async (transaction: Transaction) => {
    if (transaction.stockReduced) {
      alert("Stok untuk transaksi ini sudah dikurangi sebelumnya!");
      return;
    }

    try {
      // Confirm action
      const confirmReduce = window.confirm(
        `Apakah Anda yakin ingin mengurangi stok untuk transaksi #${transaction.id}?\n\n` +
          transaction.items
            .map(
              (item) =>
                `${item.ikanName}: ${item.quantity} unit (Stok: ${item.initialStock} → ${item.remainingStock})`
            )
            .join("\n")
      );

      if (!confirmReduce) return;

      // Mock API call to reduce stock
      // Dalam implementasi real, ini akan memanggil API untuk update stok ikan
      console.log("Reducing stock for transaction:", transaction.id);

      // Update transaction status
      const updatedTransactions = transactions.map((t) =>
        t.id === transaction.id
          ? { ...t, stockReduced: true, status: "delivered" as const }
          : t
      );

      setTransactions(updatedTransactions);
      alert("Stok berhasil dikurangi!");
    } catch (err) {
      console.error("Error reducing stock:", err);
      setError("Gagal mengurangi stok");
    }
  };
  const handleExportTransactions = () => {
    try {
      // Filter hanya transaksi yang sudah mengurangi stok
      const completedTransactions = transactions.filter((t) => t.stockReduced);

      if (completedTransactions.length === 0) {
        alert("Tidak ada transaksi yang telah mengurangi stok untuk diekspor.");
        return;
      }

      // Generate rekap per ikan
      const salesReport: {
        [key: string]: {
          ikanName: string;
          initialStock: number;
          totalSold: number;
          remainingStock: number;
          totalRevenue: number;
          totalProfit: number;
          totalCost: number;
          transactions: number;
        };
      } = {};

      completedTransactions.forEach((transaction) => {
        transaction.items.forEach((item) => {
          const key = `${item.ikanId}-${item.ikanName}`;

          if (!salesReport[key]) {
            salesReport[key] = {
              ikanName: item.ikanName,
              initialStock: item.initialStock || 0,
              totalSold: 0,
              remainingStock: item.remainingStock || 0,
              totalRevenue: 0,
              totalProfit: 0,
              totalCost: 0,
              transactions: 0,
            };
          }

          salesReport[key].totalSold += item.quantity;
          salesReport[key].totalRevenue += item.subtotal;
          salesReport[key].totalProfit += item.profit;
          salesReport[key].totalCost += item.costPrice * item.quantity;
          salesReport[key].transactions += 1;
        });
      });

      // Generate CSV content
      const csvHeader = [
        "Nama Ikan",
        "Stok Awal",
        "Terjual",
        "Sisa Stok",
        "Total Transaksi",
        "Total Revenue (Rp)",
        "Total Cost (Rp)",
        "Total Profit (Rp)",
        "Margin (%)",
        "Tanggal Export",
      ].join(",");

      const csvRows = Object.values(salesReport).map((report) => {
        const margin =
          report.totalRevenue > 0
            ? ((report.totalProfit / report.totalRevenue) * 100).toFixed(2)
            : "0";
        return [
          `"${report.ikanName}"`,
          report.initialStock,
          report.totalSold,
          report.remainingStock,
          report.transactions,
          report.totalRevenue,
          report.totalCost,
          report.totalProfit,
          `${margin}%`,
          new Date().toLocaleDateString("id-ID"),
        ].join(",");
      });

      // Summary row
      const totalRevenue = Object.values(salesReport).reduce(
        (sum, r) => sum + r.totalRevenue,
        0
      );
      const totalCost = Object.values(salesReport).reduce(
        (sum, r) => sum + r.totalCost,
        0
      );
      const totalProfit = Object.values(salesReport).reduce(
        (sum, r) => sum + r.totalProfit,
        0
      );
      const totalMargin =
        totalRevenue > 0
          ? ((totalProfit / totalRevenue) * 100).toFixed(2)
          : "0";

      const summaryRow = [
        '"TOTAL KESELURUHAN"',
        "-",
        Object.values(salesReport).reduce((sum, r) => sum + r.totalSold, 0),
        "-",
        completedTransactions.length,
        totalRevenue,
        totalCost,
        totalProfit,
        `${totalMargin}%`,
        new Date().toLocaleDateString("id-ID"),
      ].join(",");

      const csvContent = [csvHeader, ...csvRows, "", summaryRow].join("\\n");

      // Download CSV
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `Laporan_Penjualan_Ikan_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show summary alert
      const summary = Object.values(salesReport);
      alert(
        `Laporan berhasil diekspor!\\n\\n` +
          `📊 RINGKASAN PENJUALAN:\\n` +
          `• Total Ikan Terjual: ${summary.reduce(
            (sum, r) => sum + r.totalSold,
            0
          )} unit\\n` +
          `• Total Revenue: Rp ${totalRevenue.toLocaleString("id-ID")}\\n` +
          `• Total Profit: Rp ${totalProfit.toLocaleString("id-ID")}\\n` +
          `• Margin Keuntungan: ${totalMargin}%\\n` +
          `• Jumlah Transaksi: ${completedTransactions.length}\\n\\n` +
          `File disimpan sebagai: Laporan_Penjualan_Ikan_${
            new Date().toISOString().split("T")[0]
          }.csv`
      );
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Gagal mengekspor data. Silakan coba lagi.");
    }
  };

  // Enhanced Status badge component
  const StatusBadge: React.FC<{ status: Transaction["status"] }> = ({
    status,
  }) => {
    const statusConfig = {
      pending: {
        bg: "bg-gradient-to-r from-yellow-100 to-yellow-200",
        text: "text-yellow-800",
        border: "border-yellow-300",
        icon: Clock,
        label: "Menunggu",
      },
      confirmed: {
        bg: "bg-gradient-to-r from-blue-100 to-blue-200",
        text: "text-blue-800",
        border: "border-blue-300",
        icon: Package,
        label: "Dikonfirmasi",
      },
      shipped: {
        bg: "bg-gradient-to-r from-purple-100 to-purple-200",
        text: "text-purple-800",
        border: "border-purple-300",
        icon: TrendingUp,
        label: "Dikirim",
      },
      delivered: {
        bg: "bg-gradient-to-r from-green-100 to-green-200",
        text: "text-green-800",
        border: "border-green-300",
        icon: Package,
        label: "Selesai",
      },
      cancelled: {
        bg: "bg-gradient-to-r from-red-100 to-red-200",
        text: "text-red-800",
        border: "border-red-300",
        icon: Clock,
        label: "Dibatalkan",
      },
    };

    const config = statusConfig[status];
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} shadow-sm`}
      >
        <IconComponent className="w-3 h-3 mr-1.5" />
        {config.label}
      </span>
    );
  };

  // Enhanced Payment status badge
  const PaymentBadge: React.FC<{ status: Transaction["paymentStatus"] }> = ({
    status,
  }) => {
    const statusConfig = {
      unpaid: {
        bg: "bg-gradient-to-r from-red-100 to-red-200",
        text: "text-red-800",
        border: "border-red-300",
        icon: Clock,
        label: "Belum Bayar",
      },
      paid: {
        bg: "bg-gradient-to-r from-green-100 to-green-200",
        text: "text-green-800",
        border: "border-green-300",
        icon: CreditCard,
        label: "Lunas",
      },
      refunded: {
        bg: "bg-gradient-to-r from-gray-100 to-gray-200",
        text: "text-gray-800",
        border: "border-gray-300",
        icon: TrendingUp,
        label: "Refund",
      },
    };

    const config = statusConfig[status];
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} shadow-sm`}
      >
        <IconComponent className="w-3 h-3 mr-1.5" />
        {config.label}
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
      <div className="bg-[#E8EAE5] p-6">
        {/* Enhanced Header Section */}
        <div className="relative mb-8 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#E8EAE5]/30 to-[#96BF8A]/10 rounded-3xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#96BF8A]/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00412E]/5 rounded-full translate-y-12 -translate-x-12"></div>

          {/* Floating Transaction Icon */}
          <div className="absolute top-6 right-8 opacity-10">
            <CreditCard className="w-20 h-20 text-[#00412E] animate-pulse" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/50 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Section - Title & Description */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {/* Icon Container */}
                    <div className="flex-shrink-0 p-4 bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-2xl shadow-lg">
                      <ShoppingCart className="w-8 h-8 text-white" />
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h1
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00412E] leading-tight"
                        style={{ fontFamily: "Hanken Grotesk" }}
                      >
                        Manage Transaksi
                      </h1>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-[#96BF8A] rounded-full animate-pulse"></div>
                        <p
                          className="text-gray-600 text-base lg:text-lg font-medium"
                          style={{ fontFamily: "Hanken Grotesk" }}
                        >
                          Kelola semua transaksi pesanan ikan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Info Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#00412E]/10 text-[#00412E] border border-[#00412E]/20">
                    <Package className="w-3 h-3 mr-1" />
                    {transactions.length} Total Transaksi
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                    <Clock className="w-3 h-3 mr-1" />
                    {
                      transactions.filter((t) => t.status === "pending").length
                    }{" "}
                    Menunggu
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Rp{" "}
                    {transactions
                      .filter((t) => t.paymentStatus === "paid")
                      .reduce((sum, t) => sum + t.totalAmount, 0)
                      .toLocaleString("id-ID")}{" "}
                    Revenue
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl shadow-lg">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Enhanced Filters and Search */}
        <div className="mb-6 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama, telepon, atau ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] transition-all duration-200 bg-white/80"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as typeof statusFilter)
              }
              className="px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] transition-all duration-200 bg-white/80"
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
              className="px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] transition-all duration-200 bg-white/80"
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
                className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] transition-all duration-200 bg-white/80"
              />
            </div>

            {/* Export Button */}
            <button
              onClick={handleExportTransactions}
              className="flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Transaksi
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {transactions.length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-green-600">
                  Rp{" "}
                  {transactions
                    .filter((t) => t.stockReduced)
                    .reduce((sum, t) => sum + t.totalAmount, 0)
                    .toLocaleString("id-ID")}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Stok Terjual
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {transactions
                    .filter((t) => t.stockReduced)
                    .reduce(
                      (sum, t) =>
                        sum +
                        t.items.reduce(
                          (itemSum, item) =>
                            itemSum +
                            ((item.initialStock || 0) -
                              (item.remainingStock || 0)),
                          0
                        ),
                      0
                    )}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Profit
                </p>
                <p className="text-2xl font-bold text-green-600">
                  Rp{" "}
                  {transactions
                    .filter((t) => t.stockReduced)
                    .reduce((sum, t) => sum + t.totalProfit, 0)
                    .toLocaleString("id-ID")}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Transactions Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ID Transaksi
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Items & Stok
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total & Profit
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Pembayaran
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-white/80 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          #{transaction.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {transaction.items.map((item, index) => (
                          <div key={item.id} className="mb-1">
                            <div className="font-medium">
                              {item.ikanName} x{item.quantity}
                            </div>
                            <div className="text-xs text-gray-500">
                              Stok: {item.initialStock} → {item.remainingStock}
                              {transaction.stockReduced && (
                                <span className="ml-1 text-green-600">
                                  ✓ Dikurangi
                                </span>
                              )}
                            </div>
                            {index < transaction.items.length - 1 && (
                              <hr className="my-1" />
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-bold text-gray-900">
                          Rp {transaction.totalAmount.toLocaleString("id-ID")}
                        </div>
                        <div className="text-green-600 font-medium">
                          Profit: Rp{" "}
                          {transaction.totalProfit.toLocaleString("id-ID")}
                        </div>
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
                          className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="Lihat Detail"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditTransaction(transaction)}
                          className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-all duration-200"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {!transaction.stockReduced && (
                          <button
                            onClick={() => handleStockReduction(transaction)}
                            className="p-2 text-orange-600 hover:text-orange-900 hover:bg-orange-50 rounded-lg transition-all duration-200"
                            title="Kurangi Stok"
                          >
                            <Package className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteTransaction(transaction)}
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Hapus"
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

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4 p-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/60 hover:shadow-lg transition-all duration-200"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                  <div className="text-lg font-bold text-gray-900">
                    #{transaction.id}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(transaction.orderDate).toLocaleDateString("id-ID")}
                  </div>
                </div>

                {/* Items */}
                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Items:</h4>
                  <div className="space-y-2">
                    {transaction.items.map((item, index) => (
                      <div key={item.id} className="text-sm">
                        <div className="font-medium text-gray-900">
                          {item.ikanName} x{item.quantity}
                        </div>
                        <div className="text-xs text-gray-500">
                          Stok: {item.initialStock} → {item.remainingStock}
                          {transaction.stockReduced && (
                            <span className="ml-1 text-green-600 font-semibold">
                              ✓ Dikurangi
                            </span>
                          )}
                        </div>
                        {index < transaction.items.length - 1 && (
                          <hr className="my-1 border-gray-200" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total & Profit */}
                <div className="mb-3 bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-600">Total:</span>
                    <span className="text-lg font-bold text-gray-900">
                      Rp {transaction.totalAmount.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Profit:</span>
                    <span className="text-sm font-semibold text-green-600">
                      Rp {transaction.totalProfit.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <StatusBadge status={transaction.status} />
                  <PaymentBadge status={transaction.paymentStatus} />
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewTransaction(transaction)}
                      className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Lihat Detail"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditTransaction(transaction)}
                      className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-all duration-200"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    {!transaction.stockReduced && (
                      <button
                        onClick={() => handleStockReduction(transaction)}
                        className="p-2 text-orange-600 hover:text-orange-900 hover:bg-orange-50 rounded-lg transition-all duration-200"
                        title="Kurangi Stok"
                      >
                        <Package className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteTransaction(transaction)}
                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Hapus"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Empty State */}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 p-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
                <Package className="h-12 w-12 text-gray-400 mx-auto" />
              </div>
              <p className="text-gray-500 text-lg font-medium">
                Tidak ada transaksi ditemukan
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Coba ubah filter pencarian Anda
              </p>
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
