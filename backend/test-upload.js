const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

async function testUpload() {
  try {
    console.log('🧪 Testing image upload...');
    
    // Create a simple test image (1x1 pixel PNG)
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0x0F, 0x00, 0x00,
      0x01, 0x00, 0x01, 0x5C, 0xC1, 0x53, 0x81, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    // Write test image to file
    fs.writeFileSync('test-image.png', testImageBuffer);
    
    // Create FormData
    const formData = new FormData();
    formData.append('nama', 'Ikan Test Upload');
    formData.append('harga', '50000');
    formData.append('satuanHarga', 'kg');
    formData.append('stok', '10');
    formData.append('status', 'tersedia');
    formData.append('deskripsi', 'Ikan test untuk upload gambar');
    formData.append('gambar', fs.createReadStream('test-image.png'));
    
    // Send request
    const response = await fetch('http://localhost:3001/api/ikan', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Upload berhasil!');
      console.log('📊 Response:', JSON.stringify(result, null, 2));
      
      if (result.data && result.data.gambar) {
        console.log('🖼️  Gambar tersimpan di:', result.data.gambar);
        console.log('🔗 URL lengkap:', `http://localhost:3001${result.data.gambar}`);
      }
    } else {
      console.log('❌ Upload gagal!');
      console.log('📊 Error:', JSON.stringify(result, null, 2));
    }
    
    // Clean up test file
    fs.unlinkSync('test-image.png');
    
  } catch (error) {
    console.error('💥 Error testing upload:', error.message);
  }
}

// Run test
testUpload();
