const mysql = require("mysql2/promise");

async function insertWebsiteTitle() {
  try {
    console.log("🔗 Connecting to database...");
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "katalog_ikan",
    });

    console.log("✅ Connected to database");

    // Insert websiteTitle setting
    const [result] = await connection.execute(
      `
      INSERT INTO settings (setting_key, setting_value, description, created_at, updated_at) 
      VALUES (?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE 
        setting_value = VALUES(setting_value),
        description = VALUES(description),
        updated_at = NOW()
    `,
      [
        "websiteTitle",
        "Ikan Oni - Platform Penjualan Ikan Segar",
        "Title website untuk SEO dan tab browser",
      ]
    );

    console.log("✅ websiteTitle setting inserted/updated:", result);

    // Verify the data
    const [rows] = await connection.execute(
      "SELECT * FROM settings WHERE setting_key = ?",
      ["websiteTitle"]
    );
    console.log("📋 Current websiteTitle setting:", rows[0]);

    await connection.end();
    console.log("🔒 Database connection closed");

    // Also insert other default settings if they don't exist
    console.log("🔗 Inserting other default settings...");
    const connection2 = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "katalog_ikan",
    });

    const defaultSettings = [
      ["websiteName", "Ikan Oni", "Nama website"],
      [
        "websiteDescription",
        "Platform penjualan ikan segar terpercaya",
        "Deskripsi website",
      ],
      ["primaryColor", "#00412E", "Warna primer website"],
      ["secondaryColor", "#96BF8A", "Warna sekunder website"],
      ["logoUrl", "", "URL logo website"],
      ["contactEmail", "admin@ikanoni.com", "Email kontak"],
      ["contactPhone", "+62 812-3456-7890", "Nomor telepon kontak"],
      ["address", "Jl. Ikan Segar No. 123, Jakarta", "Alamat"],
    ];

    for (const [key, value, description] of defaultSettings) {
      const [result] = await connection2.execute(
        `
        INSERT INTO settings (setting_key, setting_value, description, created_at, updated_at) 
        VALUES (?, ?, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE 
          updated_at = updated_at
      `,
        [key, value, description]
      );
      console.log(`✅ ${key} setting processed`);
    }

    await connection2.end();
    console.log("🎉 All settings processed successfully!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

insertWebsiteTitle();
