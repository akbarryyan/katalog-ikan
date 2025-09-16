const axios = require("axios");

async function testSettingsAPI() {
  try {
    console.log("🧪 Testing Settings API...");

    // Test GET settings
    console.log("📥 Testing GET /api/settings...");
    const getResponse = await axios.get("http://localhost:3001/api/settings");
    console.log(
      "✅ GET Settings Response:",
      JSON.stringify(getResponse.data, null, 2)
    );

    // Test UPDATE settings with websiteTitle
    console.log("\n📤 Testing PUT /api/settings with websiteTitle...");
    const testData = {
      websiteName: "Ikan Oni",
      websiteTitle: "Ikan Oni - Platform Penjualan Ikan Segar Terbaik",
      websiteDescription:
        "Platform penjualan ikan segar terpercaya dan berkualitas",
      primaryColor: "#00412E",
      secondaryColor: "#96BF8A",
      logoUrl: "",
      contactEmail: "admin@ikanoni.com",
      contactPhone: "+62 812-3456-7890",
      address: "Jl. Ikan Segar No. 123, Jakarta",
    };

    const updateResponse = await axios.put(
      "http://localhost:3001/api/settings",
      testData
    );
    console.log(
      "✅ PUT Settings Response:",
      JSON.stringify(updateResponse.data, null, 2)
    );

    // Test GET again to verify
    console.log("\n📥 Testing GET /api/settings again to verify...");
    const verifyResponse = await axios.get(
      "http://localhost:3001/api/settings"
    );
    console.log(
      "✅ Verification Response:",
      JSON.stringify(verifyResponse.data, null, 2)
    );

    console.log("\n🎉 Settings API Test Complete!");
  } catch (error) {
    console.error("❌ Error testing Settings API:", error.message);
    if (error.response) {
      console.error("📊 Error Response:", error.response.data);
    }
  }
}

testSettingsAPI();
