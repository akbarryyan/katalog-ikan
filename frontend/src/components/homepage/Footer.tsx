import React from "react";
import defaultLogo from "../../assets/removebg-preview.png";
import { SERVER_BASE_URL } from "../../config/api";

interface WebsiteSettings {
  websiteName: string;
  websiteDescription: string;
  logoUrl: string;
  contactEmail: string;
  whatsappNumber: string;
  address: string;
}

interface FooterProps {
  settings: WebsiteSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#00412E] via-[#00412E]/95 to-[#96BF8A] text-white">
      {/* Background Pattern - Mobile Optimized */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 right-2 sm:top-8 sm:right-8 w-12 h-12 sm:w-24 sm:h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-2 left-2 sm:bottom-8 sm:left-8 w-8 h-8 sm:w-16 sm:h-16 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 sm:w-12 sm:h-12 bg-white rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-10 h-10 sm:w-20 sm:h-20 bg-white rounded-full"></div>
      </div>

      {/* Floating Elements - Mobile Optimized */}
      <div className="absolute top-2 right-2 sm:top-6 sm:right-6 opacity-10">
        <span className="text-xl sm:text-4xl">🐟</span>
      </div>
      <div className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 opacity-10">
        <span className="text-lg sm:text-3xl">🌊</span>
      </div>
      <div className="absolute top-1/2 right-1/4 opacity-5">
        <span className="text-sm sm:text-2xl">🐠</span>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-20">
          {/* Main Footer Content - Ultra Mobile Optimized */}
          <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 lg:gap-12">
            {/* Company Info - Ultra Mobile Optimized */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex flex-col items-center sm:items-start mb-6 ">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-4">
                  <img
                    src={settings.logoUrl ? `${SERVER_BASE_URL}${settings.logoUrl}` : defaultLogo}
                    alt={`${settings.websiteName} Logo`}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-3"
                    style={{ fontFamily: "Hanken Grotesk" }}
                  >
                    {settings.websiteName}
                  </h3>
                  <div className="flex items-center justify-center sm:justify-start mb-4">
                    <div className="w-2 h-2 bg-[#96BF8A] rounded-full mr-2"></div>
                    <span className="text-sm text-white/80 font-medium leading-relaxed">
                      {settings.websiteDescription}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-left space-y-4">
                <p className="text-white/80 text-sm">{settings.address}</p>
                {/* Social Media Links - Ultra Mobile Optimized */}
                <div className="flex items-center justify-center sm:justify-start space-x-3">
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110"
                  >
                    <span className="text-xl">📘</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110"
                  >
                    <span className="text-xl">📷</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110"
                  >
                    <span className="text-xl">🐦</span>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110"
                  >
                    <span className="text-xl">📱</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links - Ultra Mobile Optimized */}
            <div className="text-center sm:text-left">
              <h4
                className="text-lg sm:text-xl font-bold mb-6 flex items-center justify-center sm:justify-start"
                style={{ fontFamily: "Hanken Grotesk" }}
              >
                <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-sm">🔗</span>
                </span>
                Layanan Kami
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-center sm:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">🐟</span>
                  </div>
                  <span className="text-white/90 font-medium text-sm group-hover:text-white transition-colors duration-200">
                    Ikan Segar Berkualitas
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">🚚</span>
                  </div>
                  <span className="text-white/90 font-medium text-sm group-hover:text-white transition-colors duration-200">
                    Pengiriman Cepat
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">💯</span>
                  </div>
                  <span className="text-white/90 font-medium text-sm group-hover:text-white transition-colors duration-200">
                    Garansi Kualitas
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">📞</span>
                  </div>
                  <span className="text-white/90 font-medium text-sm group-hover:text-white transition-colors duration-200">
                    Layanan 24/7
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info - Ultra Mobile Optimized */}
            <div className="text-center sm:text-left">
              <h4
                className="text-lg sm:text-xl font-bold mb-6 flex items-center justify-center sm:justify-start"
                style={{ fontFamily: "Hanken Grotesk" }}
              >
                <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-sm">📞</span>
                </span>
                Hubungi Kami
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-center sm:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">📧</span>
                  </div>
                  <div>
                    <div className="text-white/90 font-medium text-sm group-hover:text-white transition-colors duration-200">
                      Email
                    </div>
                    <div className="text-white/70 text-xs">
                      {settings.contactEmail}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">📱</span>
                  </div>
                  <div>
                    <div className="text-white/90 font-medium text-sm group-hover:text-white transition-colors duration-200">
                      WhatsApp
                    </div>
                    <div className="text-white/70 text-xs">
                      {settings.whatsappNumber}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">📍</span>
                  </div>
                  <div>
                    <div className="text-white/90 font-medium text-sm group-hover:text-white transition-colors duration-200">
                      Alamat
                    </div>
                    <div className="text-white/70 text-xs">
                      {settings.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Ultra Mobile Optimized */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
              <div className="text-center sm:text-left">
                <p className="text-white/70 text-xs sm:text-sm mb-2">
                  © 2024 {settings.websiteName}. All rights reserved.
                </p>
                <p className="text-white/60 text-xs">
                  Dibuat dengan ❤️ untuk para pecinta ikan segar
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center space-x-3 sm:space-x-6 text-white/70 text-xs sm:text-sm">
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200 hover:underline"
                >
                  Privacy Policy
                </a>
                <span className="hidden sm:inline">•</span>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200 hover:underline"
                >
                  Terms of Service
                </a>
                <span className="hidden sm:inline">•</span>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200 hover:underline"
                >
                  FAQ
                </a>
                <span className="hidden sm:inline">•</span>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200 hover:underline"
                >
                  Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave - Mobile Optimized */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-16 fill-white"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
