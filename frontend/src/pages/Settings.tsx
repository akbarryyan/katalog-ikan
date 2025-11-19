import { useState, useEffect } from "react";
import axios from "axios";
import {
  Settings as SettingsIcon,
  Save,
  Globe,
  Palette,
  Bell,
  Shield,
  Database,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Layout from "../components/Layout";
import { API_ENDPOINTS, SERVER_BASE_URL } from "../config/api";

interface SettingsProps {
  onLogout?: () => void;
  user?: { email: string } | null;
  onNavigate?: (
    route:
      | "dashboard"
      | "tambah-ikan"
      | "kelola-ikan"
      | "settings"
      | "transactions"
  ) => void;
}

interface WebsiteSettings {
  websiteName: string;
  websiteTitle: string;
  websiteDescription: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address: string;
}

const Settings = ({ onLogout, user, onNavigate }: SettingsProps) => {
  const [settings, setSettings] = useState<WebsiteSettings>({
    websiteName: "Ikan Oni",
    websiteTitle: "Ikan Oni - Platform Penjualan Ikan Segar",
    websiteDescription: "Platform penjualan ikan segar terpercaya",
    primaryColor: "#00412E",
    secondaryColor: "#96BF8A",
    logoUrl: "",
    contactEmail: "admin@ikanoni.com",
    contactPhone: "+62 812-3456-7890",
    whatsappNumber: "+62 812-3456-7890",
    address: "Jl. Ikan Segar No. 123, Jakarta",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      console.log("Loading settings from API...");

      // Add longer delay to see skeleton loading clearly
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await axios.get(API_ENDPOINTS.settings);

      if (response.data.success) {
        setSettings(response.data.data);
        if (response.data.data.logoUrl) {
          setLogoPreview(`${SERVER_BASE_URL}${response.data.data.logoUrl}`);
        }
        console.log("Settings loaded successfully:", response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to load settings");
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      setMessage({ type: "error", text: "Gagal memuat pengaturan" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof WebsiteSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setMessage(null);

      const formData = new FormData();

      // Append all text settings
      Object.entries(settings).forEach(([key, value]) => {
        if (key !== "logoUrl") {
          // Don't send the old logoUrl string
          formData.append(key, value);
        }
      });

      // Append the new logo file if it exists
      if (logoFile) {
        formData.append("logo", logoFile);
      }

      // Add delay for better UX feedback
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.put(API_ENDPOINTS.settings, formData);

      if (response.data.success) {
        setMessage({ type: "success", text: "Pengaturan berhasil disimpan!" });
        console.log("Settings saved successfully:", response.data.data);

        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent("settingsUpdated"));

        // Update logo preview with the new URL from server and reset file state
        setSettings(response.data.data);
        setLogoPreview(`${SERVER_BASE_URL}${response.data.data.logoUrl}`);
        setLogoFile(null);
      } else {
        throw new Error(response.data.message || "Failed to save settings");
      }

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      if (error instanceof Error) {
        console.error("📊 Error message:", error.message);
      }
      if (error && typeof error === "object" && "response" in error) {
        console.error("📊 Error response:", (error as any).response?.data);
      }
      setMessage({ type: "error", text: "Gagal menyimpan pengaturan" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    try {
      setIsSaving(true);
      setMessage(null);

      console.log("Resetting settings to default...");

      // Add delay for better UX feedback
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const response = await axios.post(`${API_ENDPOINTS.settings}/reset`);

      if (response.data.success) {
        setSettings(response.data.data);
        setMessage({
          type: "success",
          text: "Pengaturan berhasil direset ke default!",
        });
        console.log("Settings reset successfully:", response.data.data);

        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent("settingsUpdated"));
      } else {
        throw new Error(response.data.message || "Failed to reset settings");
      }

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error resetting settings:", error);
      setMessage({ type: "error", text: "Gagal mereset pengaturan" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Layout
        onLogout={onLogout || (() => {})}
        user={user || null}
        onNavigate={onNavigate || (() => {})}
        currentRoute="settings"
      >
        <div className="bg-[#E8EAE5] p-6">
          {/* Header Section Skeleton */}
          <div className="relative mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-[#E8EAE5]/30 to-[#96BF8A]/10 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#96BF8A]/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00412E]/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="absolute top-6 right-8 opacity-10">
              <SettingsIcon className="w-20 h-20 text-[#00412E] animate-pulse" />
            </div>

            <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/50 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 p-4 bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-2xl shadow-lg animate-pulse">
                        <div className="w-8 h-8 bg-white/20 rounded"></div>
                      </div>

                      <div>
                        <div className="h-8 bg-gray-200 rounded-lg w-64 mb-2 animate-pulse"></div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-2 h-2 bg-[#96BF8A] rounded-full animate-pulse"></div>
                          <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Form Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Settings Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Website Information Skeleton */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
                <div className="flex items-center mb-6">
                  <div className="w-6 h-6 bg-gray-200 rounded mr-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-40"></div>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index}>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                      {index === 2 && (
                        <div className="h-3 bg-gray-100 rounded w-64 mt-1"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information Skeleton */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
                <div className="flex items-center mb-6">
                  <div className="w-6 h-6 bg-gray-200 rounded mr-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-36"></div>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index}>
                      <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                      <div
                        className={`h-12 bg-gray-100 rounded-xl w-full ${
                          index === 4 ? "h-20" : ""
                        }`}
                      ></div>
                      {index === 3 && (
                        <div className="h-3 bg-gray-100 rounded w-72 mt-1"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              {/* Color Settings Skeleton */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
                <div className="flex items-center mb-6">
                  <div className="w-6 h-6 bg-gray-200 rounded mr-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>

                <div className="space-y-4">
                  {[1, 2].map((index) => (
                    <div key={index}>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1 h-10 bg-gray-100 rounded-lg"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Skeleton */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
                <div className="flex items-center mb-6">
                  <div className="w-6 h-6 bg-gray-200 rounded mr-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>

                <div className="space-y-3">
                  <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
                  <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
                </div>
              </div>

              {/* Preview Skeleton */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
                <div className="flex items-center mb-6">
                  <div className="w-6 h-6 bg-gray-200 rounded mr-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>

                <div className="space-y-3">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div
                        className={`h-5 bg-gray-200 rounded ${
                          index === 1
                            ? "w-32"
                            : index === 2
                            ? "w-48"
                            : index === 3
                            ? "w-40"
                            : "w-36"
                        }`}
                      ></div>
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Indicator */}
          <div className="fixed bottom-8 right-8 z-50">
            <div className="bg-white rounded-full p-4 shadow-lg border border-gray-200 animate-pulse">
              <Loader2 className="w-6 h-6 text-[#96BF8A] animate-spin" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      onLogout={onLogout || (() => {})}
      user={user || null}
      onNavigate={onNavigate || (() => {})}
      currentRoute="settings"
    >
      <div className="bg-[#E8EAE5] p-6">
        {/* Header Section */}
        <div className="relative mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#E8EAE5]/30 to-[#96BF8A]/10 rounded-3xl"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#96BF8A]/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00412E]/5 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="absolute top-6 right-8 opacity-10">
            <SettingsIcon className="w-20 h-20 text-[#00412E] animate-pulse" />
          </div>

          <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-white/50 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 p-4 bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-2xl shadow-lg">
                      <SettingsIcon className="w-8 h-8 text-white" />
                    </div>

                    <div>
                      <h1
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00412E] leading-tight"
                        style={{ fontFamily: "Hanken Grotesk" }}
                      >
                        Pengaturan Website
                      </h1>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-[#96BF8A] rounded-full animate-pulse"></div>
                        <p
                          className="text-gray-600 text-base lg:text-lg font-medium"
                          style={{ fontFamily: "Hanken Grotesk" }}
                        >
                          Kelola pengaturan website dan aplikasi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl border ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center">
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}

        {/* Settings Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Website Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <Globe className="w-6 h-6 text-[#96BF8A] mr-3" />
                <h2
                  className="text-xl font-bold text-[#00412E]"
                  style={{ fontFamily: "Hanken Grotesk" }}
                >
                  Informasi Website
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    🌐 Nama Website
                  </label>
                  <input
                    type="text"
                    value={settings.websiteName}
                    onChange={(e) =>
                      handleInputChange("websiteName", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200"
                    placeholder="Masukkan nama website"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    📄 Title Website (SEO)
                  </label>
                  <input
                    type="text"
                    value={settings.websiteTitle}
                    onChange={(e) =>
                      handleInputChange("websiteTitle", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200"
                    placeholder="Masukkan title website untuk SEO"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Title yang akan muncul di tab browser dan hasil pencarian
                    Google
                  </p>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    📝 Deskripsi Website
                  </label>
                  <textarea
                    value={settings.websiteDescription}
                    onChange={(e) =>
                      handleInputChange("websiteDescription", e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200 resize-none"
                    placeholder="Masukkan deskripsi website"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    🖼️ URL Logo 🖼️ Unggah Logo
                  </label>
                  <div className="flex items-center space-x-4">
                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 shadow-sm"
                      />
                    )}
                    <label className="flex-1 block">
                      <span className="sr-only">Pilih file logo</span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/gif, image/svg+xml"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00412E]/10 file:text-[#00412E] hover:file:bg-[#00412E]/20 cursor-pointer"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Rekomendasi ukuran: 200x200px. Format: PNG, JPG, GIF, atau
                    SVG.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <Bell className="w-6 h-6 text-[#96BF8A] mr-3" />
                <h2
                  className="text-xl font-bold text-[#00412E]"
                  style={{ fontFamily: "Hanken Grotesk" }}
                >
                  Informasi Kontak
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    📧 Email Kontak
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) =>
                      handleInputChange("contactEmail", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200"
                    placeholder="admin@ikanoni.com"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    📱 Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) =>
                      handleInputChange("contactPhone", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200"
                    placeholder="+62 812-3456-7890"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    💬 Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={settings.whatsappNumber}
                    onChange={(e) =>
                      handleInputChange("whatsappNumber", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200"
                    placeholder="+62 812-3456-7890"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nomor WhatsApp untuk tombol "Pesan Sekarang" di homepage
                  </p>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    📍 Alamat
                  </label>
                  <textarea
                    value={settings.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200 resize-none"
                    placeholder="Jl. Ikan Segar No. 123, Jakarta"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Color Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <Palette className="w-6 h-6 text-[#96BF8A] mr-3" />
                <h2
                  className="text-xl font-bold text-[#00412E]"
                  style={{ fontFamily: "Hanken Grotesk" }}
                >
                  Warna Tema
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    🎨 Warna Primer
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) =>
                        handleInputChange("primaryColor", e.target.value)
                      }
                      className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) =>
                        handleInputChange("primaryColor", e.target.value)
                      }
                      className="flex-1 px-3 py-2 bg-gray-50/80 border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200 font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-2"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    🎨 Warna Sekunder
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) =>
                        handleInputChange("secondaryColor", e.target.value)
                      }
                      className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.secondaryColor}
                      onChange={(e) =>
                        handleInputChange("secondaryColor", e.target.value)
                      }
                      className="flex-1 px-3 py-2 bg-gray-50/80 border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <Shield className="w-6 h-6 text-[#96BF8A] mr-3" />
                <h2
                  className="text-xl font-bold text-[#00412E]"
                  style={{ fontFamily: "Hanken Grotesk" }}
                >
                  Aksi
                </h2>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#00412E] to-[#96BF8A] text-white font-semibold rounded-xl hover:from-[#96BF8A] hover:to-[#00412E] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Simpan Pengaturan
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Reset ke Default
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <Database className="w-6 h-6 text-[#96BF8A] mr-3" />
                <h2
                  className="text-xl font-bold text-[#00412E]"
                  style={{ fontFamily: "Hanken Grotesk" }}
                >
                  Preview
                </h2>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">
                    Nama Website:
                  </p>
                  <p
                    className="text-lg font-bold"
                    style={{
                      color: settings.primaryColor,
                      fontFamily: "Hanken Grotesk",
                    }}
                  >
                    {settings.websiteName}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">
                    Title Website (SEO):
                  </p>
                  <p
                    className="text-base font-semibold text-gray-800"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    {settings.websiteTitle}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">
                    Deskripsi:
                  </p>
                  <p className="text-sm text-gray-700">
                    {settings.websiteDescription}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">WhatsApp:</p>
                  <p className="text-sm text-gray-700 font-mono">
                    {settings.whatsappNumber}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <div
                    className="w-8 h-8 rounded-lg border border-gray-200"
                    style={{ backgroundColor: settings.primaryColor }}
                    title="Warna Primer"
                  ></div>
                  <div
                    className="w-8 h-8 rounded-lg border border-gray-200"
                    style={{ backgroundColor: settings.secondaryColor }}
                    title="Warna Sekunder"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
