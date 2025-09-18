import { Search, Filter, Plus, Menu } from "lucide-react";

interface TopBarProps {
  currentRoute: string;
  onNavigate: (route: "dashboard" | "tambah-ikan" | "kelola-ikan") => void;
  onMobileMenuClick: () => void;
}

const TopBar = ({
  currentRoute,
  onNavigate,
  onMobileMenuClick,
}: TopBarProps) => {
  return (
    <div className="bg-white shadow-lg border-b border-gray-100">
      <div className="flex items-center justify-between h-20 px-6 lg:px-8">
        {/* Left Section - Mobile Menu & Breadcrumb */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMobileMenuClick}
            className="lg:hidden p-3 rounded-xl text-[#00412E] hover:bg-[#E8EAE5] transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Menu size={24} />
          </button>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
            <button
              onClick={() => onNavigate("dashboard")}
              className="font-medium text-[#00412E] hover:text-[#96BF8A] transition-colors duration-200 cursor-pointer"
            >
              Dashboard
            </button>
            {currentRoute !== "dashboard" && (
              <>
                <span>/</span>
                <span className="capitalize">
                  {currentRoute.replace("-", " ")}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:block">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#96BF8A] group-focus-within:text-[#00412E] transition-colors duration-200"
              size={20}
            />
            <input
              type="text"
              placeholder="🔍 Cari ikan, kategori, atau harga..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#96BF8A] focus:border-[#96BF8A] transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400"
              style={{ fontFamily: "Hanken Grotesk" }}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="hidden lg:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 rounded-md">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Mobile Search Button */}
          <button className="md:hidden p-3 rounded-xl text-[#00412E] hover:bg-[#E8EAE5] transition-all duration-200 hover:scale-105 active:scale-95">
            <Search size={20} />
          </button>

          {/* Filter Button */}
          <button className="flex items-center px-4 py-3 text-sm font-medium text-[#00412E] bg-[#96BF8A]/10 hover:bg-[#96BF8A]/20 rounded-xl transition-all duration-200 border border-[#96BF8A]/20 hover:border-[#96BF8A]/30 hover:scale-105 active:scale-95 group">
            <Filter
              size={18}
              className="mr-2 group-hover:rotate-180 transition-transform duration-300"
            />
            <span className="hidden sm:inline">Filter</span>
          </button>

          {/* Quick Actions Dropdown */}
          <div className="relative group">
            <button className="flex items-center px-4 py-3 text-sm font-medium text-[#00412E] bg-[#96BF8A]/10 hover:bg-[#96BF8A]/20 rounded-xl transition-all duration-200 border border-[#96BF8A]/20 hover:border-[#96BF8A]/30 hover:scale-105 active:scale-95">
              <Plus size={18} className="mr-2" />
              <span className="hidden sm:inline">Quick Add</span>
              <svg
                className="w-4 h-4 ml-2 group-hover:rotate-180 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 z-50">
              <div className="py-2">
                <button
                  onClick={() => onNavigate("kelola-ikan")}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#E8EAE5] hover:text-[#00412E] transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Tambah Ikan Baru
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (Hidden by default, shown when mobile search button clicked) */}
      <div className="md:hidden px-6 pb-4">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#96BF8A]"
            size={20}
          />
          <input
            type="text"
            placeholder="🔍 Cari ikan, kategori, atau harga..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#96BF8A] focus:border-[#96BF8A] transition-all duration-200 bg-gray-50 focus:bg-white placeholder:text-gray-400"
            style={{ fontFamily: "Hanken Grotesk" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
