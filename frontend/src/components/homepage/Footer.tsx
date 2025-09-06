import React from 'react';

interface WebsiteSettings {
  websiteName: string;
  websiteDescription: string;
  contactInfo: string;
}

interface FooterProps {
  settings: WebsiteSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#00412E] via-[#00412E]/95 to-[#96BF8A] text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-8 right-8 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white rounded-full"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-6 right-6 opacity-10">
        <span className="text-4xl">🐟</span>
      </div>
      <div className="absolute bottom-6 left-6 opacity-10">
        <span className="text-3xl">🌊</span>
      </div>
      <div className="absolute top-1/2 right-1/4 opacity-5">
        <span className="text-2xl">🐠</span>
      </div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info - Enhanced */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-3xl">🐟</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                    {settings.websiteName}
                  </h3>
                  <div className="flex items-center justify-center lg:justify-start">
                    <div className="w-2 h-2 bg-[#96BF8A] rounded-full mr-2"></div>
                    <span className="text-sm text-white/80 font-medium">Toko Ikan Segar Terpercaya</span>
                  </div>
                </div>
              </div>
              
              <p className="text-white/90 mb-6 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                {settings.websiteDescription}
              </p>
              
              <p className="text-white/80 text-base mb-6">
                {settings.contactInfo}
              </p>
              
              {/* Social Media Links */}
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110">
                  <span className="text-xl">📘</span>
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110">
                  <span className="text-xl">📷</span>
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110">
                  <span className="text-xl">🐦</span>
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 hover:scale-110">
                  <span className="text-xl">📱</span>
                </a>
              </div>
            </div>
            
            {/* Quick Links - Enhanced */}
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-bold mb-6 flex items-center justify-center lg:justify-start" style={{ fontFamily: 'Hanken Grotesk' }}>
                <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-sm">🔗</span>
                </span>
                Layanan Kami
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center justify-center lg:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">🐟</span>
                  </div>
                  <span className="text-white/90 font-medium group-hover:text-white transition-colors duration-200">Ikan Segar Berkualitas</span>
                </li>
                <li className="flex items-center justify-center lg:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">🚚</span>
                  </div>
                  <span className="text-white/90 font-medium group-hover:text-white transition-colors duration-200">Pengiriman Cepat</span>
                </li>
                <li className="flex items-center justify-center lg:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">💯</span>
                  </div>
                  <span className="text-white/90 font-medium group-hover:text-white transition-colors duration-200">Garansi Kualitas</span>
                </li>
                <li className="flex items-center justify-center lg:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">📞</span>
                  </div>
                  <span className="text-white/90 font-medium group-hover:text-white transition-colors duration-200">Layanan 24/7</span>
                </li>
              </ul>
            </div>
            
            {/* Contact Info - Enhanced */}
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-bold mb-6 flex items-center justify-center lg:justify-start" style={{ fontFamily: 'Hanken Grotesk' }}>
                <span className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-sm">📞</span>
                </span>
                Hubungi Kami
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">📧</span>
                  </div>
                  <div>
                    <div className="text-white/90 font-medium group-hover:text-white transition-colors duration-200">Email</div>
                    <div className="text-white/70 text-sm">admin@ikanoni.com</div>
                  </div>
                </div>
                <div className="flex items-center justify-center lg:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">📱</span>
                  </div>
                  <div>
                    <div className="text-white/90 font-medium group-hover:text-white transition-colors duration-200">WhatsApp</div>
                    <div className="text-white/70 text-sm">+62 812-3456-7890</div>
                  </div>
                </div>
                <div className="flex items-center justify-center lg:justify-start group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-200">
                    <span className="text-lg">📍</span>
                  </div>
                  <div>
                    <div className="text-white/90 font-medium group-hover:text-white transition-colors duration-200">Alamat</div>
                    <div className="text-white/70 text-sm">Jakarta, Indonesia</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar - Enhanced */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <p className="text-white/70 text-sm mb-2">
                  © 2024 {settings.websiteName}. All rights reserved.
                </p>
                <p className="text-white/60 text-xs">
                  Dibuat dengan ❤️ untuk para pecinta ikan segar
                </p>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-end space-x-6 text-white/70 text-sm">
                <a href="#" className="hover:text-white transition-colors duration-200 hover:underline">Privacy Policy</a>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:text-white transition-colors duration-200 hover:underline">Terms of Service</a>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:text-white transition-colors duration-200 hover:underline">FAQ</a>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:text-white transition-colors duration-200 hover:underline">Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
