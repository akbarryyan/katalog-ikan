import { useState, useEffect } from "react";
import axios from "axios";
import {
  Fish,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Clock,
  Package,
  DollarSign,
  Grid3X3,
  List,
  BarChart3,
  Loader2,
} from "lucide-react";
import Layout from "../components/Layout";
import { API_ENDPOINTS } from "../config/api";
import Modal from "../components/Modal";
import FormTambahIkan from "../components/FormTambahIkan";
import ConfirmModal from "../components/ConfirmModal";

interface Ikan {
  id: number;
  nama: string;
  harga: number;
  satuanHarga: "kg" | "gram";
  stok: number;
  status: "tersedia" | "habis" | "pre-order";
  deskripsi: string;
  gambar: string;
  created_at: string;
  updated_at: string;
}

interface ManageIkanProps {
  onLogout?: () => void;
  user?: { email: string } | null;
  onNavigate?: (
    route:
      | "dashboard"
      | "tambah-ikan"
      | "edit-ikan"
      | "kelola-ikan"
      | "settings"
  ) => void;
}

const ManageIkan = ({ onLogout, user, onNavigate }: ManageIkanProps) => {
  // Data state
  const [ikanList, setIkanList] = useState<Ikan[]>([]);
  const [filteredIkan, setFilteredIkan] = useState<Ikan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalIkan: 0,
    tersedia: 0,
    habis: 0,
    preOrder: 0,
    totalValue: 0,
    categoryCount: 0,
  });

  // UI state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilters, setShowFilters] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [ikanToDelete, setIkanToDelete] = useState<Ikan | null>(null);

  const [editData, setEditData] = useState<Ikan | null>(null);

  // Force TypeScript to recognize the variables

  const statuses = ["all", "tersedia", "habis", "pre-order"];

  // API Functions
  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.ikanStats);
      console.log("Dashboard Stats API Response:", response.data);

      if (response.data.success && response.data.data) {
        setDashboardStats(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

  const fetchIkan = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(API_ENDPOINTS.ikan);
      console.log("API Response:", response.data);

      // Pastikan data adalah array dan ambil dari response yang benar
      const data = response.data.data || response.data;

      if (Array.isArray(data)) {
        // Convert string numbers to actual numbers if needed
        const processedData = data.map((ikan) => ({
          ...ikan,
          harga:
            typeof ikan.harga === "string"
              ? parseFloat(ikan.harga) || 0
              : Number(ikan.harga) || 0,
          stok:
            typeof ikan.stok === "string"
              ? parseInt(ikan.stok) || 0
              : Number(ikan.stok) || 0,
        }));

        setIkanList(processedData);
        setFilteredIkan(processedData);

        // Debug logging untuk memeriksa data
        console.log("Sample ikan data:", processedData[0]);
        if (processedData.length > 0) {
          const sample = processedData[0];
          console.log("Harga ikan pertama:", sample.harga, typeof sample.harga);
          console.log("Stok ikan pertama:", sample.stok, typeof sample.stok);
          console.log("Total ikan pertama:", sample.harga * sample.stok);
        }
      } else {
        console.error("Data bukan array:", data);
        setIkanList([]);
        setFilteredIkan([]);
        setError("Format data tidak valid");
      }
    } catch (err) {
      console.error("Error fetching ikan:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteIkan = async (id: number) => {
    try {
      await axios.delete(`${API_ENDPOINTS.ikan}/${id}`);

      // Refresh data after deletion
      await fetchIkan();
      return true;
    } catch (err) {
      console.error("Error deleting ikan:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menghapus data"
      );
      return false;
    }
  };

  // Filter and sort data
  useEffect(() => {
    let filtered = [...ikanList];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (ikan) =>
          ikan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ikan.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ikan.harga.toString().includes(searchTerm)
      );
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((ikan) => ikan.status === selectedStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Ikan];
      let bValue: any = b[sortBy as keyof Ikan];

      if (sortBy === "created_at" || sortBy === "updated_at") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredIkan(filtered);
  }, [ikanList, searchTerm, selectedStatus, sortBy, sortOrder]);

  // Fetch data on component mount
  useEffect(() => {
    fetchIkan();
    fetchDashboardStats();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "tersedia":
        return "text-green-600 bg-green-100";
      case "habis":
        return "text-red-600 bg-red-100";
      case "pre-order":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "tersedia":
        return <CheckCircle className="w-4 h-4" />;
      case "habis":
        return <AlertCircle className="w-4 h-4" />;
      case "pre-order":
        return <Clock className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Helper function to calculate total value (sum of prices only, not multiplied by stock)
  const calculateTotalPriceSum = (ikanArray: Ikan[]) => {
    if (!Array.isArray(ikanArray) || ikanArray.length === 0) return 0;

    const total = ikanArray.reduce((sum: number, ikan: Ikan) => {
      const harga = Number(ikan.harga) || 0;
      return sum + harga;
    }, 0);

    return total;
  };

  const handleEdit = (ikan: Ikan) => {
    console.log("Edit ikan:", ikan);
    // Set edit data and open modal
    setEditData(ikan);
    setIsModalOpen(true);
    setIsModalLoading(false);
  };

  const handleDelete = (ikan: Ikan) => {
    setIkanToDelete(ikan);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!ikanToDelete) return;

    try {
      setDeleteLoading(true);
      const success = await deleteIkan(ikanToDelete.id);
      if (success) {
        setIsDeleteModalOpen(false);
        setIkanToDelete(null);
        await fetchDashboardStats(); // Refresh dashboard stats setelah delete
        // Show success notification (you can add toast notification here)
        console.log(`${ikanToDelete.nama} berhasil dihapus`);
      }
    } catch (error) {
      console.error("Error deleting ikan:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setIkanToDelete(null);
  };

  const handleView = (ikan: Ikan) => {
    console.log("View ikan:", ikan);
    // TODO: Implement view functionality
  };

  // Modal handlers
  const handleOpenModal = () => {
    setIsButtonLoading(true);

    // Simulate button loading for 1.5 seconds
    setTimeout(() => {
      setIsButtonLoading(false);
      setIsModalOpen(true);
      // Modal langsung tampil form tanpa loading
      setIsModalLoading(false);
    }, 1500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalLoading(false);
    setEditData(null); // Reset edit data when closing modal
  };

  const handleSaveIkan = async (data: any) => {
    try {
      // Data sudah disimpan oleh FormTambahIkan component
      // Sekarang kita hanya perlu refresh data dan close modal
      await fetchIkan();
      await fetchDashboardStats(); // Refresh dashboard stats juga
      handleCloseModal();

      // Show success message
      const successMessage = data.id
        ? "Data ikan berhasil diperbarui!"
        : "Ikan baru berhasil ditambahkan!";
      alert(successMessage);
    } catch (err) {
      console.error("Error handling save result:", err);
      alert("Terjadi kesalahan saat memproses hasil penyimpanan");
    }
  };

  return (
    <>
      <Layout
        onLogout={onLogout || (() => {})}
        user={user || null}
        onNavigate={onNavigate || (() => {})}
        currentRoute="kelola-ikan"
      >
        <div className="bg-[#E8EAE5] p-6">
          {/* Enhanced Header Section */}
          <div className="relative mb-8 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-[#E8EAE5]/30 to-[#96BF8A]/10 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#96BF8A]/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00412E]/5 rounded-full translate-y-12 -translate-x-12"></div>

            {/* Floating Fish Icon */}
            <div className="absolute top-6 right-8 opacity-10">
              <Fish className="w-20 h-20 text-[#00412E] animate-pulse" />
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
                        <Fish className="w-8 h-8 text-white" />
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h1
                          className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00412E] leading-tight"
                          style={{ fontFamily: "Hanken Grotesk" }}
                        >
                          Kelola Katalog Ikan
                        </h1>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-2 h-2 bg-[#96BF8A] rounded-full animate-pulse"></div>
                          <p
                            className="text-gray-600 text-base lg:text-lg font-medium"
                            style={{ fontFamily: "Hanken Grotesk" }}
                          >
                            Kelola semua data ikan dalam satu tempat yang mudah
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Info Badges */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#00412E]/10 text-[#00412E] border border-[#00412E]/20">
                      <Package className="w-3 h-3 mr-1" />
                      {Array.isArray(filteredIkan)
                        ? filteredIkan.length
                        : 0}{" "}
                      Total Ikan
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {Array.isArray(filteredIkan)
                        ? filteredIkan.filter(
                            (i: Ikan) => i.status === "tersedia"
                          ).length
                        : 0}{" "}
                      Tersedia
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {Array.isArray(filteredIkan)
                        ? filteredIkan.filter((i: Ikan) => i.status === "habis")
                            .length
                        : 0}{" "}
                      Habis Stok
                    </span>
                  </div>
                </div>

                {/* Right Section - Action Buttons */}
                <div className="flex-shrink-0">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Primary Action Button */}
                    <button
                      onClick={handleOpenModal}
                      disabled={isButtonLoading}
                      className="add-button-group inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white font-semibold rounded-xl hover:from-[#96BF8A] hover:to-[#00412E] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:-translate-y-0 relative"
                    >
                      {isButtonLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span className="whitespace-nowrap">Memuat...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 mr-2 hover:rotate-90 transition-transform duration-300" />
                          <span className="whitespace-nowrap">
                            Tambah Ikan Baru
                          </span>
                          <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </>
                      )}
                    </button>

                    {/* Secondary Action Buttons */}
                    <div className="flex gap-2">
                      <button className="group inline-flex items-center justify-center px-4 py-3.5 bg-white text-[#00412E] font-medium rounded-xl hover:bg-[#96BF8A]/10 transition-all duration-300 hover:scale-105 active:scale-95 border border-[#96BF8A]/20 hover:border-[#96BF8A]/40 shadow-lg hover:shadow-xl">
                        <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        <span className="hidden sm:inline whitespace-nowrap">
                          Import
                        </span>
                      </button>

                      <button className="group inline-flex items-center justify-center px-4 py-3.5 bg-white text-[#00412E] font-medium rounded-xl hover:bg-[#96BF8A]/10 transition-all duration-300 hover:scale-105 active:scale-95 border border-[#96BF8A]/20 hover:border-[#96BF8A]/40 shadow-lg hover:shadow-xl">
                        <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        <span className="hidden sm:inline whitespace-nowrap">
                          Export
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats Summary */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-[#00412E]/5 to-[#96BF8A]/5 rounded-xl border border-[#96BF8A]/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">
                        Total Nilai:
                      </span>
                      <span className="text-[#00412E] font-bold">
                        {formatPrice(
                          dashboardStats.totalValue > 0
                            ? dashboardStats.totalValue
                            : calculateTotalPriceSum(filteredIkan)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar - Mobile Friendly */}
              <div className="mt-6 pt-6 border-t border-gray-200/50 lg:hidden">
                <div className="flex flex-wrap gap-2 justify-center">
                  <button className="flex-1 min-w-0 inline-flex items-center justify-center px-4 py-2 bg-[#00412E]/10 text-[#00412E] text-sm font-medium rounded-lg hover:bg-[#00412E]/20 transition-all duration-200">
                    <Search className="w-4 h-4 mr-2" />
                    Cari Ikan
                  </button>
                  <button className="flex-1 min-w-0 inline-flex items-center justify-center px-4 py-2 bg-[#96BF8A]/10 text-[#00412E] text-sm font-medium rounded-lg hover:bg-[#96BF8A]/20 transition-all duration-200">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium text-gray-600"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    Total Ikan
                  </p>
                  <p
                    className="text-3xl font-bold text-[#00412E] mt-1"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    {dashboardStats.totalIkan}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-xl">
                  <Fish className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium text-gray-600"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    Tersedia
                  </p>
                  <p
                    className="text-3xl font-bold text-green-600 mt-1"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    {dashboardStats.tersedia}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <CheckCircle className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium text-gray-600"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    Habis Stok
                  </p>
                  <p
                    className="text-3xl font-bold text-red-600 mt-1"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    {dashboardStats.habis}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                  <AlertCircle className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium text-gray-600"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    Total Nilai
                  </p>
                  <p
                    className="text-3xl font-bold text-[#00412E] mt-1"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    {formatPrice(
                      dashboardStats.totalValue > 0
                        ? dashboardStats.totalValue
                        : calculateTotalPriceSum(filteredIkan)
                    )}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl">
                  <DollarSign className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Search & Filter Section */}
          <div className="relative mb-8 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-[#96BF8A]/5 to-[#00412E]/5 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-20 h-20 bg-[#96BF8A]/10 rounded-full -translate-y-10 -translate-x-10"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#00412E]/10 rounded-full translate-y-8 translate-x-8"></div>

            {/* Main Container */}
            <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/50 shadow-xl">
              {/* Top Section - Search & Quick Actions */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                {/* Enhanced Search Bar */}
                <div className="flex-1">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#96BF8A]/20 to-[#00412E]/20 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <div className="relative">
                      <Search
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#96BF8A] group-focus-within:text-[#00412E] transition-colors duration-200"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="🔍 Cari nama ikan, harga, atau deskripsi..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-300 placeholder:text-gray-500 text-gray-800 shadow-sm hover:shadow-md"
                        style={{ fontFamily: "Hanken Grotesk" }}
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <kbd className="hidden lg:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-white/80 rounded-md border border-gray-200">
                          ⌘K
                        </kbd>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap gap-3">
                  {/* Filter Toggle Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`group inline-flex items-center px-4 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${
                      showFilters
                        ? "bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white shadow-[#96BF8A]/25"
                        : "bg-white text-[#00412E] border border-[#96BF8A]/20 hover:border-[#96BF8A]/40 hover:bg-[#96BF8A]/5"
                    }`}
                  >
                    <Filter
                      size={18}
                      className={`mr-2 transition-transform duration-300 ${
                        showFilters ? "rotate-180" : "group-hover:rotate-12"
                      }`}
                    />
                    <span className="hidden sm:inline">Filter</span>
                    {showFilters ? (
                      <ChevronUp size={18} className="ml-2 animate-bounce" />
                    ) : (
                      <ChevronDown size={18} className="ml-2" />
                    )}
                  </button>

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1.5 border border-gray-200/50 shadow-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-3 rounded-xl transition-all duration-200 ${
                        viewMode === "grid"
                          ? "bg-white text-[#00412E] shadow-lg scale-105 border border-[#96BF8A]/20"
                          : "text-gray-500 hover:text-[#00412E] hover:bg-white/50"
                      }`}
                      title="Grid View"
                    >
                      <Grid3X3 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-3 rounded-xl transition-all duration-200 ${
                        viewMode === "list"
                          ? "bg-white text-[#00412E] shadow-lg scale-105 border border-[#96BF8A]/20"
                          : "text-gray-500 hover:text-[#00412E] hover:bg-white/50"
                      }`}
                      title="List View"
                    >
                      <List size={18} />
                    </button>
                  </div>

                  {/* Export Button */}
                  <button className="group inline-flex items-center px-4 py-4 text-sm font-semibold text-[#00412E] bg-white hover:bg-[#96BF8A]/5 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-gray-200/50 hover:border-[#96BF8A]/30 shadow-lg hover:shadow-xl">
                    <Download className="w-4 h-4 mr-2 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>

              {/* Results Summary */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4">
                  <span
                    className="text-sm text-gray-600 font-medium"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    Menampilkan{" "}
                    <span className="font-bold text-[#00412E]">
                      {Array.isArray(filteredIkan) ? filteredIkan.length : 0}
                    </span>{" "}
                    ikan
                  </span>
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#96BF8A]/10 text-[#00412E] border border-[#96BF8A]/20">
                      <Search className="w-3 h-3 mr-1" />"{searchTerm}"
                    </span>
                  )}
                </div>

                {/* Quick Filter Badges */}
                <div className="flex flex-wrap gap-2">
                  {selectedStatus !== "all" && (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        selectedStatus === "tersedia"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : selectedStatus === "habis"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "bg-yellow-100 text-yellow-700 border-yellow-200"
                      } border`}
                    >
                      {getStatusIcon(selectedStatus)}
                      <span className="ml-1 capitalize">{selectedStatus}</span>
                      <button
                        onClick={() => setSelectedStatus("all")}
                        className="ml-2 hover:bg-opacity-20 hover:bg-gray-500 rounded-full p-0.5 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>

              {/* Advanced Filters Panel */}
              {showFilters && (
                <div className="border-t border-gray-200/50 pt-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="mb-4">
                    <h3
                      className="text-lg font-semibold text-[#00412E] mb-2"
                      style={{ fontFamily: "Hanken Grotesk" }}
                    >
                      🔧 Filter Lanjutan
                    </h3>
                    <p className="text-sm text-gray-600">
                      Gunakan filter di bawah untuk mencari ikan yang lebih
                      spesifik
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Status Filter */}
                    <div className="space-y-2">
                      <label
                        className="flex items-center text-sm font-semibold text-gray-700 mb-3"
                        style={{ fontFamily: "Hanken Grotesk" }}
                      >
                        <Package className="w-4 h-4 mr-2 text-[#96BF8A]" />
                        Status Ketersediaan
                      </label>
                      <div className="relative">
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                          style={{ fontFamily: "Hanken Grotesk" }}
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status === "all"
                                ? "📋 Semua Status"
                                : status === "tersedia"
                                ? "✅ Tersedia"
                                : status === "habis"
                                ? "❌ Habis Stok"
                                : "⏳ Pre-Order"}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                          size={16}
                        />
                      </div>
                    </div>

                    {/* Sort Filter */}
                    <div className="space-y-2">
                      <label
                        className="flex items-center text-sm font-semibold text-gray-700 mb-3"
                        style={{ fontFamily: "Hanken Grotesk" }}
                      >
                        <BarChart3 className="w-4 h-4 mr-2 text-[#96BF8A]" />
                        Urutkan Berdasarkan
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-l-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                            style={{ fontFamily: "Hanken Grotesk" }}
                          >
                            <option value="nama">📝 Nama</option>
                            <option value="harga">💰 Harga</option>
                            <option value="stok">📦 Stok</option>
                            <option value="created_at">📅 Tanggal</option>
                          </select>
                          <ChevronDown
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                            size={16}
                          />
                        </div>
                        <button
                          onClick={() =>
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                          }
                          className={`px-4 py-3 border border-l-0 border-gray-200/50 rounded-r-xl hover:bg-gray-50 transition-all duration-200 ${
                            sortOrder === "asc"
                              ? "bg-[#96BF8A]/10 text-[#00412E]"
                              : "bg-gray-50 text-gray-600"
                          }`}
                          title={
                            sortOrder === "asc"
                              ? "Urutan Naik (A-Z, 1-9)"
                              : "Urutan Turun (Z-A, 9-1)"
                          }
                        >
                          {sortOrder === "asc" ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200/50">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Filter aktif:</span>
                      <span className="font-semibold text-[#00412E]">
                        {selectedStatus !== "all" ? 1 : 0} dari 1
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedStatus("all");
                          setSortBy("nama");
                          setSortOrder("asc");
                          setSearchTerm("");
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      >
                        Reset Semua
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#00412E] to-[#96BF8A] hover:from-[#96BF8A] hover:to-[#00412E] rounded-lg transition-all duration-200"
                      >
                        Terapkan Filter
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Content Section - Data Ikan */}
              {!isLoading && !error && (
                <div className="border-t border-gray-200/50 pt-6">
                  {viewMode === "grid" ? (
                    /* Grid View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredIkan.map((ikan: Ikan) => (
                        <div
                          key={ikan.id}
                          className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                          {/* Fish Image */}
                          <div className="h-48 bg-gradient-to-br from-[#00412E] to-[#96BF8A] flex items-center justify-center overflow-hidden">
                            {ikan.gambar ? (
                              <img
                                src={`http://localhost:3001${ikan.gambar}`}
                                alt={ikan.nama}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to placeholder if image fails to load
                                  e.currentTarget.style.display = "none";
                                  const nextElement = e.currentTarget
                                    .nextElementSibling as HTMLElement;
                                  if (nextElement) {
                                    nextElement.style.display = "flex";
                                  }
                                }}
                              />
                            ) : null}
                            <div
                              className={`w-full h-full flex items-center justify-center ${
                                ikan.gambar ? "hidden" : "flex"
                              }`}
                            >
                              <Fish className="w-16 h-16 text-white opacity-80" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h3
                                className="text-lg font-semibold text-gray-900 group-hover:text-[#00412E] transition-colors duration-200"
                                style={{ fontFamily: "Hanken Grotesk" }}
                              >
                                {ikan.nama}
                              </h3>
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => handleView(ikan)}
                                  className="p-2 text-gray-400 hover:text-[#00412E] hover:bg-[#96BF8A]/10 rounded-lg transition-all duration-200"
                                >
                                  <Eye size={16} />
                                </button>
                                <button
                                  onClick={() => handleEdit(ikan)}
                                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                >
                                  <Edit3 size={16} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDelete(ikan);
                                  }}
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <DollarSign className="w-4 h-4 mr-2" />
                                {formatPrice(ikan.harga)} / {ikan.satuanHarga}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Package className="w-4 h-4 mr-2" />
                                Stok: {ikan.stok}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  ikan.status
                                )}`}
                              >
                                {getStatusIcon(ikan.status)}
                                <span className="ml-1 capitalize">
                                  {ikan.status}
                                </span>
                              </span>
                              <span className="text-sm text-gray-500">
                                Stok: {ikan.stok}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* List View */
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                style={{ fontFamily: "Hanken Grotesk" }}
                              >
                                Ikan
                              </th>
                              <th
                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                style={{ fontFamily: "Hanken Grotesk" }}
                              >
                                Satuan Harga
                              </th>
                              <th
                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                style={{ fontFamily: "Hanken Grotesk" }}
                              >
                                Harga
                              </th>
                              <th
                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                style={{ fontFamily: "Hanken Grotesk" }}
                              >
                                Stok
                              </th>
                              <th
                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                style={{ fontFamily: "Hanken Grotesk" }}
                              >
                                Status
                              </th>
                              <th
                                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                style={{ fontFamily: "Hanken Grotesk" }}
                              >
                                Aksi
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredIkan.map((ikan: Ikan) => (
                              <tr
                                key={ikan.id}
                                className="hover:bg-gray-50 transition-colors duration-200"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-lg flex items-center justify-center mr-3 overflow-hidden">
                                      {ikan.gambar ? (
                                        <img
                                          src={`http://localhost:3001${ikan.gambar}`}
                                          alt={ikan.nama}
                                          className="w-full h-full object-cover rounded-lg"
                                          onError={(e) => {
                                            // Fallback to placeholder if image fails to load
                                            e.currentTarget.style.display =
                                              "none";
                                            const nextElement = e.currentTarget
                                              .nextElementSibling as HTMLElement;
                                            if (nextElement) {
                                              nextElement.style.display =
                                                "flex";
                                            }
                                          }}
                                        />
                                      ) : null}
                                      <div
                                        className={`w-full h-full flex items-center justify-center ${
                                          ikan.gambar ? "hidden" : "flex"
                                        }`}
                                      >
                                        <Fish className="w-6 h-6 text-white" />
                                      </div>
                                    </div>
                                    <div>
                                      <div
                                        className="text-sm font-medium text-gray-900"
                                        style={{ fontFamily: "Hanken Grotesk" }}
                                      >
                                        {ikan.nama}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {formatPrice(ikan.harga)} /{" "}
                                        {ikan.satuanHarga}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {ikan.satuanHarga}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {formatPrice(ikan.harga)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {ikan.stok}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                      ikan.status
                                    )}`}
                                  >
                                    {getStatusIcon(ikan.status)}
                                    <span className="ml-1 capitalize">
                                      {ikan.status}
                                    </span>
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleView(ikan)}
                                      className="text-[#00412E] hover:text-[#96BF8A] transition-colors duration-200"
                                    >
                                      <Eye size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleEdit(ikan)}
                                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                    >
                                      <Edit3 size={16} />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleDelete(ikan);
                                      }}
                                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {Array.isArray(filteredIkan) && filteredIkan.length === 0 && (
                    <div className="text-center py-12">
                      <Fish className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3
                        className="text-lg font-medium text-gray-900 mb-2"
                        style={{ fontFamily: "Hanken Grotesk" }}
                      >
                        Belum ada data ikan
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Mulai dengan menambahkan ikan pertama ke katalog
                      </p>
                      <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white font-medium rounded-xl hover:from-[#96BF8A] hover:to-[#00412E] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
                        <Plus className="w-5 h-5 mr-2" />
                        Tambah Ikan Pertama
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <Loader2 className="w-16 h-16 text-[#96BF8A] mx-auto mb-4 animate-spin" />
              <h3
                className="text-lg font-medium text-gray-900 mb-2"
                style={{ fontFamily: "Hanken Grotesk" }}
              >
                Memuat data ikan...
              </h3>
              <p className="text-gray-500">Mohon tunggu sebentar</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3
                className="text-lg font-medium text-gray-900 mb-2"
                style={{ fontFamily: "Hanken Grotesk" }}
              >
                Terjadi kesalahan
              </h3>
              <p className="text-gray-500 mb-6">{error}</p>
              <button
                onClick={fetchIkan}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white font-medium rounded-xl hover:from-[#96BF8A] hover:to-[#00412E] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              >
                <Loader2 className="w-5 h-5 mr-2" />
                Coba Lagi
              </button>
            </div>
          )}
        </div>
      </Layout>

      {/* Modal Tambah/Edit Ikan - Outside Layout */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editData ? "✏️ Edit Data Ikan" : "🐟 Tambah Ikan Baru"}
        size="lg"
        showLoading={isModalLoading}
        loadingMessage={
          editData ? "Memuat form edit ikan..." : "Memuat form tambah ikan..."
        }
      >
        <FormTambahIkan
          mode={editData ? "edit" : "add"}
          initialData={editData || undefined}
          onSave={handleSaveIkan}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Delete Confirmation Modal - Outside Layout */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="🗑️ Hapus Data Ikan"
        message={`Apakah Anda yakin ingin menghapus data ikan "${ikanToDelete?.nama}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="danger"
        loading={deleteLoading}
      />
    </>
  );
};

export default ManageIkan;
