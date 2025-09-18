import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";

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

interface IkanGridProps {
  filteredIkan: Ikan[];
  searchTerm: string;
  statusFilter: "all" | "tersedia" | "habis";
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: "all" | "tersedia" | "habis") => void;
}

const IkanGrid: React.FC<IkanGridProps> = ({
  filteredIkan,
  searchTerm,
  statusFilter,
  setSearchTerm,
  setStatusFilter,
}) => {
  // State untuk menyimpan nomor WhatsApp dari settings
  const [whatsappNumber, setWhatsappNumber] =
    useState<string>("+62 812-3456-7890"); // Default

  // Fetch nomor WhatsApp dari settings saat component mount
  useEffect(() => {
    const fetchWhatsAppNumber = async () => {
      try {
        console.log("🔍 Fetching WhatsApp number from settings...");
        const response = await axios.get(API_ENDPOINTS.settings);

        if (response.data.success && response.data.data.whatsappNumber) {
          setWhatsappNumber(response.data.data.whatsappNumber);
          console.log(
            "✅ WhatsApp number loaded:",
            response.data.data.whatsappNumber
          );
        } else {
          console.log(
            "⚠️ WhatsApp number not found in settings, using default"
          );
        }
      } catch (error) {
        console.error("❌ Error fetching WhatsApp number:", error);
        console.log("📱 Using default WhatsApp number");
      }
    };

    fetchWhatsAppNumber();
  }, []);

  // Fungsi untuk handle WhatsApp redirect
  const handleWhatsAppRedirect = (ikan: Ikan) => {
    console.log("📱 Opening WhatsApp for ikan:", ikan.nama);
    console.log("📞 WhatsApp number:", whatsappNumber);

    // Format nomor WhatsApp (remove spaces, dashes, and plus)
    const cleanNumber = whatsappNumber.replace(/[\s\-\+]/g, "");

    // Buat pesan WhatsApp
    const message = `Halo! Saya tertarik dengan ikan ${
      ikan.nama
    } (${ikan.harga.toLocaleString("id-ID")}/${
      ikan.satuanHarga
    }). Apakah masih tersedia?`;

    // Encode message untuk URL
    const encodedMessage = encodeURIComponent(message);

    // Buat URL WhatsApp
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    console.log("🔗 WhatsApp URL:", whatsappUrl);

    // Buka WhatsApp di tab baru
    window.open(whatsappUrl, "_blank");
  };
  // Format harga
  const formatHarga = (harga: number, satuan: string) => {
    // Format harga tanpa .00 di belakang
    const formattedHarga = Math.round(harga).toLocaleString("id-ID");
    return `Rp ${formattedHarga}/${satuan}`;
  };

  if (filteredIkan.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="text-gray-400 text-8xl mb-6">🐟</div>
        <h3
          className="text-2xl font-bold text-gray-700 mb-3"
          style={{ fontFamily: "Hanken Grotesk" }}
        >
          {searchTerm || statusFilter !== "all"
            ? "Tidak ada ikan yang sesuai"
            : "Belum ada ikan tersedia"}
        </h3>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          {searchTerm || statusFilter !== "all"
            ? "Coba ubah kata kunci pencarian atau filter untuk menemukan ikan yang Anda cari"
            : "Kami sedang mempersiapkan stok ikan segar terbaik untuk Anda"}
        </p>
        {(searchTerm || statusFilter !== "all") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
            className="mt-6 bg-[#00412E] text-white px-6 py-3 rounded-xl hover:bg-[#00412E]/90 transition-colors font-medium"
          >
            Reset Filter
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredIkan.map((ikan) => (
        <div
          key={ikan.id}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#00412E]/30 overflow-hidden"
        >
          {/* Card Header - Image */}
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {ikan.gambar ? (
              <img
                src={`http://localhost:3001${ikan.gambar}`}
                alt={ikan.nama}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTUwIDEwMEgxMDBMMTAwIDUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNTAgMTAwTDEwMCA1MEwxNTAgMTAwSDUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIxMDAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij7wn5SPPC90ZXh0Pgo8L3N2Zz4K";
                }}
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-6xl opacity-50">🐟</span>
              </div>
            )}

            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                  ikan.status === "tersedia"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {ikan.status === "tersedia" ? "✅ Tersedia" : "❌ Habis"}
              </span>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Card Body */}
          <div className="p-6 flex flex-col">
            {/* Header Section */}
            <div className="mb-4">
              {/* Title */}
              <h3
                className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00412E] transition-colors duration-200 line-clamp-1"
                style={{ fontFamily: "Hanken Grotesk" }}
              >
                {ikan.nama}
              </h3>

              {/* Category Badge */}
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#00412E]/10 text-[#00412E] mb-3">
                <span className="w-2 h-2 bg-[#00412E] rounded-full mr-2"></span>
                Ikan Segar
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-bold text-[#00412E]">
                    {formatHarga(ikan.harga, ikan.satuanHarga)}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Harga per {ikan.satuanHarga}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <span className="mr-1">⭐</span>
                    <span className="font-semibold">4.8</span>
                  </div>
                  <div className="text-xs text-gray-400">Rating</div>
                </div>
              </div>
            </div>

            {/* Info Cards Section */}
            <div className="mb-4 space-y-3">
              {/* Stock Info */}
              <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl px-4 py-3 border border-green-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-sm">📦</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Stok Tersedia
                    </div>
                    <div className="text-xs text-gray-600">Siap dikirim</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {ikan.stok}
                  </div>
                  <div className="text-xs text-green-500">Unit</div>
                </div>
              </div>
            </div>

            {/* Description */}
            {ikan.deskripsi && (
              <div className="mb-4 flex-1">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 mr-2">
                      📝
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      Deskripsi
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {ikan.deskripsi}
                  </p>
                </div>
              </div>
            )}

            {/* Card Footer */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              {/* WhatsApp Button */}
              <button
                onClick={() => {
                  console.log("Button clicked, ikan status:", ikan.status);
                  if (ikan.status === "tersedia") {
                    handleWhatsAppRedirect(ikan);
                  }
                }}
                disabled={ikan.status !== "tersedia"}
                className={`w-full py-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center mb-4 ${
                  ikan.status === "tersedia"
                    ? "bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white hover:from-[#00412E]/90 hover:to-[#96BF8A]/90 hover:scale-105 shadow-lg hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {ikan.status === "tersedia" ? (
                  <>
                    <span className="mr-2">📱</span>
                    <span>Pesan via WhatsApp</span>
                  </>
                ) : (
                  <>
                    <span className="mr-2">❌</span>
                    <span>Tidak Tersedia</span>
                  </>
                )}
              </button>

              {/* Date Info */}
              <div className="flex justify-between items-center text-xs text-gray-400">
                <div className="flex items-center">
                  <span className="mr-1">📅</span>
                  <span>
                    Ditambahkan{" "}
                    {new Date(ikan.created_at).toLocaleDateString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">🕒</span>
                  <span>
                    Updated{" "}
                    {new Date(ikan.updated_at).toLocaleDateString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IkanGrid;
