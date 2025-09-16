import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import MetaManager from "../utils/MetaManager";

interface WebsiteTitleHook {
  title: string;
  isLoading: boolean;
  error: string | null;
  updateTitle: (newTitle: string) => void;
}

const useWebsiteTitle = (): WebsiteTitleHook => {
  const [title, setTitle] = useState<string>(
    "Ikan Oni - Platform Penjualan Ikan Segar"
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWebsiteTitle = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("🔍 Fetching website title from API...");
      // Use optimized endpoint that only returns title
      const response = await axios.get(API_ENDPOINTS.websiteTitle);

      if (response.data.success && response.data.data.websiteTitle) {
        const websiteTitle = response.data.data.websiteTitle;
        setTitle(websiteTitle);

        // Update document title using MetaManager
        MetaManager.updateTitle(websiteTitle);
        console.log("✅ Website title updated:", websiteTitle);
      } else {
        console.warn("⚠️ No websiteTitle found in API response, using default");
      }
    } catch (err) {
      console.error("❌ Error fetching website title:", err);
      setError("Failed to fetch website title");

      // Keep default title if API fails
      MetaManager.updateTitle(title);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTitle = (newTitle: string) => {
    setTitle(newTitle);
    MetaManager.updateTitle(newTitle);
    console.log("📝 Title updated manually:", newTitle);
  };

  useEffect(() => {
    // Fetch title on mount
    fetchWebsiteTitle();

    // Listen for settings updates from Settings page
    const handleSettingsUpdate = () => {
      console.log("🔄 Settings updated, refreshing title...");
      fetchWebsiteTitle();
    };

    window.addEventListener("settingsUpdated", handleSettingsUpdate);

    return () => {
      window.removeEventListener("settingsUpdated", handleSettingsUpdate);
    };
  }, []);

  return {
    title,
    isLoading,
    error,
    updateTitle,
  };
};

export default useWebsiteTitle;
