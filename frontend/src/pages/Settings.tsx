import { useState, useEffect } from 'react';
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
  Loader2
} from 'lucide-react';
import Layout from '../components/Layout';

interface SettingsProps {
  onLogout?: () => void;
  user?: { email: string } | null;
  onNavigate?: (route: 'dashboard' | 'tambah-ikan' | 'edit-ikan' | 'kelola-ikan' | 'settings') => void;
}

interface WebsiteSettings {
  websiteName: string;
  websiteDescription: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

const Settings = ({ onLogout, user, onNavigate }: SettingsProps) => {
  const [settings, setSettings] = useState<WebsiteSettings>({
    websiteName: 'Ikan Oni',
    websiteDescription: 'Platform penjualan ikan segar terpercaya',
    primaryColor: '#00412E',
    secondaryColor: '#96BF8A',
    logoUrl: '',
    contactEmail: 'admin@ikanoni.com',
    contactPhone: '+62 812-3456-7890',
    address: 'Jl. Ikan Segar No. 123, Jakarta'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      console.log('Loading settings from API...');
      
      const response = await fetch('http://localhost:3001/api/settings/website');
      const result = await response.json();
      
      if (result.success) {
        setSettings(result.data);
        console.log('Settings loaded successfully:', result.data);
      } else {
        throw new Error(result.message || 'Failed to load settings');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setMessage({ type: 'error', text: 'Gagal memuat pengaturan' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof WebsiteSettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setMessage(null);

      console.log('Saving settings to API...', settings);
      
      const response = await fetch('http://localhost:3001/api/settings/website', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Pengaturan berhasil disimpan!' });
        console.log('Settings saved successfully:', result.data);
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('settingsUpdated'));
      } else {
        throw new Error(result.message || 'Failed to save settings');
      }
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);

    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Gagal menyimpan pengaturan' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    try {
      setIsSaving(true);
      setMessage(null);

      console.log('Resetting settings to default...');
      
      const response = await fetch('http://localhost:3001/api/settings/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();

      if (result.success) {
        setSettings(result.data);
        setMessage({ type: 'success', text: 'Pengaturan berhasil direset ke default!' });
        console.log('Settings reset successfully:', result.data);
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('settingsUpdated'));
      } else {
        throw new Error(result.message || 'Failed to reset settings');
      }
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);

    } catch (error) {
      console.error('Error resetting settings:', error);
      setMessage({ type: 'error', text: 'Gagal mereset pengaturan' });
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
        <div className="bg-[#E8EAE5] p-6 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-[#96BF8A] mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
              Memuat pengaturan...
            </h3>
            <p className="text-gray-500">Mohon tunggu sebentar</p>
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
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#00412E] leading-tight" style={{ fontFamily: 'Hanken Grotesk' }}>
                        Pengaturan Website
                      </h1>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-[#96BF8A] rounded-full animate-pulse"></div>
                        <p className="text-gray-600 text-base lg:text-lg font-medium" style={{ fontFamily: 'Hanken Grotesk' }}>
                          Kelola pengaturan website dan aplikasi
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Back to Website Button */}
                  <div className="hidden lg:block">
                    <button
                      onClick={() => window.location.href = '/'}
                      className="bg-[#00412E]/10 hover:bg-[#00412E]/20 text-[#00412E] px-4 py-2 rounded-lg transition-all duration-200 border border-[#00412E]/20 hover:border-[#00412E]/40 flex items-center space-x-2"
                    >
                      <span>🌐</span>
                      <span className="text-sm font-medium">Kembali ke Website</span>
                    </button>
                  </div>
                </div>
                
                {/* Mobile Back to Website Button */}
                <div className="lg:hidden mb-4">
                  <button
                    onClick={() => window.location.href = '/'}
                    className="w-full bg-[#00412E]/10 hover:bg-[#00412E]/20 text-[#00412E] px-4 py-3 rounded-lg transition-all duration-200 border border-[#00412E]/20 hover:border-[#00412E]/40 flex items-center justify-center space-x-2"
                  >
                    <span>🌐</span>
                    <span className="text-sm font-medium">Kembali ke Website</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              {message.type === 'success' ? (
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
                <h2 className="text-xl font-bold text-[#00412E]" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Informasi Website
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                    🌐 Nama Website
                  </label>
                  <input
                    type="text"
                    value={settings.websiteName}
                    onChange={(e) => handleInputChange('websiteName', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200"
                    placeholder="Masukkan nama website"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                    📝 Deskripsi Website
                  </label>
                  <textarea
                    value={settings.websiteDescription}
                    onChange={(e) => handleInputChange('websiteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200 resize-none"
                    placeholder="Masukkan deskripsi website"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                    🖼️ URL Logo
                  </label>
                  <input
                    type="url"
                    value={settings.logoUrl}
                    onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <Bell className="w-6 h-6 text-[#96BF8A] mr-3" />
                <h2 className="text-xl font-bold text-[#00412E]" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Informasi Kontak
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                    📧 Email Kontak
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200"
                    placeholder="admin@ikanoni.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                    📱 Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200"
                    placeholder="+62 812-3456-7890"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                    📍 Alamat
                  </label>
                  <textarea
                    value={settings.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
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
                <h2 className="text-xl font-bold text-[#00412E]" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Warna Tema
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                    🎨 Warna Primer
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50/80 border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-[#96BF8A]/50 focus:border-[#96BF8A] focus:bg-white transition-all duration-200 font-mono text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                    🎨 Warna Sekunder
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                      className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.secondaryColor}
                      onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
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
                <h2 className="text-xl font-bold text-[#00412E]" style={{ fontFamily: 'Hanken Grotesk' }}>
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
                <h2 className="text-xl font-bold text-[#00412E]" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Preview
                </h2>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Nama Website:</p>
                  <p className="text-lg font-bold" style={{ color: settings.primaryColor, fontFamily: 'Hanken Grotesk' }}>
                    {settings.websiteName}
                  </p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Deskripsi:</p>
                  <p className="text-sm text-gray-700">{settings.websiteDescription}</p>
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
