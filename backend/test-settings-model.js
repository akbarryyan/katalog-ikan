// Test Settings API with websiteTitle
console.log("🧪 Testing Settings API manually...");

// Simulate the data that frontend sends
const testSettingsData = {
  websiteName: "Ikan Oni",
  websiteTitle: "Ikan Oni - Platform Penjualan Ikan Segar Test",
  websiteDescription: "Platform penjualan ikan segar terpercaya",
  primaryColor: "#00412E",
  secondaryColor: "#96BF8A",
  logoUrl: "",
  contactEmail: "admin@ikanoni.com",
  contactPhone: "+62 812-3456-7890",
  address: "Jl. Ikan Segar No. 123, Jakarta",
};

console.log("📤 Data yang akan dikirim dari frontend:");
console.log(JSON.stringify(testSettingsData, null, 2));

// Test Settings model directly
const Settings = require("./models/Settings");

async function testDirectModel() {
  try {
    console.log("\n🔧 Testing Settings model directly...");

    // Test updateMultiple with websiteTitle
    console.log("📝 Updating settings with websiteTitle...");
    const results = await Settings.updateMultiple(testSettingsData);
    console.log("✅ Update results:", results);

    // Test getWebsiteSettings
    console.log("\n📋 Getting website settings...");
    const websiteSettings = await Settings.getWebsiteSettings();
    console.log("✅ Retrieved settings:", websiteSettings);

    // Verify websiteTitle specifically
    console.log("\n🔍 Checking websiteTitle specifically...");
    const titleSetting = await Settings.getByKey("websiteTitle");
    console.log("✅ websiteTitle setting:", titleSetting);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

testDirectModel();
