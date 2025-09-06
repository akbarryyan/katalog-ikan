import React from 'react';

interface Ikan {
  id: number;
  nama: string;
  harga: number;
  satuanHarga: 'kg' | 'gram';
  stok: string;
  status: 'tersedia' | 'habis';
  deskripsi: string;
  gambar: string;
  created_at: string;
  updated_at: string;
}

interface HeroSectionProps {
  filteredIkan: Ikan[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ filteredIkan }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#00412E] via-[#00412E]/95 to-[#96BF8A] text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white rounded-full"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-8 right-8 opacity-10">
        <span className="text-5xl">🐟</span>
      </div>
      <div className="absolute bottom-8 left-8 opacity-10">
        <span className="text-4xl">🌊</span>
      </div>
      <div className="absolute top-1/2 right-1/4 opacity-5">
        <span className="text-3xl">🐠</span>
      </div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <span className="text-2xl mr-2">🐟</span>
                <span className="text-sm font-medium">Ikan Segar Berkualitas</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Hanken Grotesk' }}>
                Ikan Segar
                <span className="block text-[#96BF8A]">Berkualitas Tinggi</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Temukan berbagai jenis ikan segar terbaik dengan harga terjangkau. 
                Dapatkan kualitas premium dengan layanan terpercaya.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-white text-[#00412E] px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  🛒 Pesan Sekarang
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#00412E] transition-all duration-200">
                  📞 Hubungi Kami
                </button>
              </div>
            </div>
            
            {/* Right Content - Stats & Features */}
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200">
                  <div className="text-3xl md:text-4xl font-bold text-[#96BF8A] mb-2">
                    {Array.isArray(filteredIkan) ? filteredIkan.length : 0}
                  </div>
                  <div className="text-sm text-white/80 font-medium">Jenis Ikan</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200">
                  <div className="text-3xl md:text-4xl font-bold text-[#96BF8A] mb-2">
                    {Array.isArray(filteredIkan) ? filteredIkan.filter((i: Ikan) => i.status === 'tersedia').length : 0}
                  </div>
                  <div className="text-sm text-white/80 font-medium">Tersedia</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-200">
                  <div className="text-3xl md:text-4xl font-bold text-[#96BF8A] mb-2">100%</div>
                  <div className="text-sm text-white/80 font-medium">Segar</div>
                </div>
              </div>
              
              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4 text-center lg:text-left">Mengapa Memilih Kami?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 bg-white/5 rounded-xl p-4">
                    <div className="w-10 h-10 bg-[#96BF8A] rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">✓</span>
                    </div>
                    <div>
                      <div className="font-semibold">Ikan Segar Berkualitas</div>
                      <div className="text-sm text-white/80">Dipilih langsung dari nelayan terpercaya</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/5 rounded-xl p-4">
                    <div className="w-10 h-10 bg-[#96BF8A] rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">🚚</span>
                    </div>
                    <div>
                      <div className="font-semibold">Pengiriman Cepat</div>
                      <div className="text-sm text-white/80">Sampai dalam 24 jam</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/5 rounded-xl p-4">
                    <div className="w-10 h-10 bg-[#96BF8A] rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">💯</span>
                    </div>
                    <div>
                      <div className="font-semibold">Garansi Kualitas</div>
                      <div className="text-sm text-white/80">100% puas atau uang kembali</div>
                    </div>
                  </div>
                </div>
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
    </section>
  );
};

export default HeroSection;
