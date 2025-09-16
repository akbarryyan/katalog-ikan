// Test Website Title API
const axios = require("axios");

async function testWebsiteTitleAPI() {
  try {
    console.log("🧪 Testing Website Title API...");
    console.log("🔗 API URL: http://localhost:3001/api/settings/website/title");

    // Test GET website title
    const response = await axios.get(
      "http://localhost:3001/api/settings/website/title"
    );

    console.log("✅ API Response:");
    console.log("Status:", response.status);
    console.log("Data:", JSON.stringify(response.data, null, 2));

    if (response.data.success) {
      console.log("🎉 Website Title:", response.data.data.websiteTitle);
    } else {
      console.log("⚠️ API returned success: false");
    }
  } catch (error) {
    console.error("❌ Error testing Website Title API:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
  }
}

testWebsiteTitleAPI();
