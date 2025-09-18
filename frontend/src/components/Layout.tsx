import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  user: { email: string } | null;
  onNavigate: (
    route:
      | "dashboard"
      | "tambah-ikan"
      | "kelola-ikan"
      | "settings"
      | "transactions"
  ) => void;
  currentRoute: string;
}

const Layout = ({
  children,
  onLogout,
  user,
  onNavigate,
  currentRoute,
}: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#E8EAE5",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Sidebar - Fixed */}
      <Sidebar
        onLogout={onLogout}
        user={user}
        onNavigate={onNavigate}
        currentRoute={currentRoute}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content - Scrollable */}
      <div
        style={{
          marginLeft: isDesktop ? "18rem" : "0", // Desktop margin for fixed sidebar
          width: isDesktop ? "calc(100% - 18rem)" : "100%",
          position: "relative",
          zIndex: 1, // Much lower than Sidebar z-index
          minHeight: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
          transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
        }}
      >
        {/* Top bar */}
        <TopBar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          onMobileMenuClick={() => setSidebarOpen(true)}
        />

        {/* Content area - This will scroll */}
        <div
          className="hide-scrollbar"
          style={{
            padding: "1.5rem",
            height: "calc(100vh - 80px)", // Fixed height instead of minHeight
            maxHeight: "calc(100vh - 80px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
