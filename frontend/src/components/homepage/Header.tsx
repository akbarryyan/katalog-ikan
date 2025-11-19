import React from "react";
import defaultLogo from "../../assets/removebg-preview.png";
import { SERVER_BASE_URL } from "../../config/api";

interface WebsiteSettings {
  websiteName: string;
  websiteDescription: string;
  logoUrl: string;
}

interface HeaderProps {
  settings: WebsiteSettings;
}

const Header: React.FC<HeaderProps> = ({ settings }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 flex items-center justify-center">
              <img
                src={settings.logoUrl ? `${SERVER_BASE_URL}${settings.logoUrl}` : defaultLogo}
                alt="Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1
                className="text-xl font-bold text-gray-900"
                style={{ fontFamily: "Hanken Grotesk" }}
              >
                {settings.websiteName}
              </h1>
              {/* <p className="text-sm text-gray-600 hidden sm:block">
                {settings.websiteDescription}
              </p> */}
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-[#00412E] font-medium transition-colors"
            >
              Beranda
            </a>
            <a
              href="#products"
              className="text-gray-700 hover:text-[#00412E] font-medium transition-colors"
            >
              Produk
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-[#00412E] font-medium transition-colors"
            >
              Tentang
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-[#00412E] font-medium transition-colors"
            >
              Kontak
            </a>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <button className="bg-[#00412E] text-white px-4 py-2 rounded-lg hover:bg-[#00412E]/90 transition-colors text-sm font-medium">
              Pesan Sekarang
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
