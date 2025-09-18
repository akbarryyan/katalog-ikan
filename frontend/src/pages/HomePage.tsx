import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import {
  Header,
  HeroSection,
  SearchFilterSection,
  IkanGrid,
  Footer,
} from "../components/homepage";

// Interface untuk data ikan
interface Ikan {
  id: number;
  nama: string;
  harga: number;
  satuanHarga: "kg" | "gram";
  stok: string;
  status: "tersedia" | "habis";
  deskripsi: string;
  gambar: string;
  created_at: string;
  updated_at: string;
}

// Interface untuk settings website
interface WebsiteSettings {
  websiteName: string;
  websiteDescription: string;
  contactInfo: string;
}

const HomePage: React.FC = () => {
  const [ikanList, setIkanList] = useState<Ikan[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings>({
    websiteName: "Ikan Oni",
    websiteDescription: "Toko Ikan Segar Terpercaya",
    contactInfo: "Hubungi kami untuk pemesanan",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "tersedia" | "habis"
  >("all");

  // Fetch data ikan
  const fetchIkan = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.ikan);
      setIkanList(response.data.data || []);
    } catch (err) {
      console.error("Error fetching ikan:", err);
      setError("Gagal mengambil data ikan");
    } finally {
      setLoading(false);
    }
  };

  // Fetch settings website
  const fetchSettings = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.settings);
      if (response.data.success && response.data.data) {
        setSettings({
          websiteName: response.data.data.websiteName || "Ikan Oni",
          websiteDescription:
            response.data.data.websiteDescription ||
            "Toko Ikan Segar Terpercaya",
          contactInfo:
            response.data.data.contactInfo || "Hubungi kami untuk pemesanan",
        });
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  useEffect(() => {
    fetchIkan();
    fetchSettings();
  }, []);

  // Filter ikan berdasarkan search dan status
  const filteredIkan = ikanList.filter((ikan) => {
    const matchesSearch =
      ikan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ikan.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ikan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data ikan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Terjadi Kesalahan
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchIkan}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header settings={settings} />

      {/* Hero Section */}
      <HeroSection filteredIkan={filteredIkan} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <SearchFilterSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Ikan Grid */}
        <IkanGrid
          filteredIkan={filteredIkan}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          setSearchTerm={setSearchTerm}
          setStatusFilter={setStatusFilter}
        />
      </main>

      {/* Enhanced Footer */}
      <Footer settings={settings} />
    </div>
  );
};

export default HomePage;
