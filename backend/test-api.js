const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001/api';

async function testAPI() {
  console.log('🧪 Testing API Ikan...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.message);
    console.log('');

    // Test get all ikan
    console.log('2. Testing get all ikan...');
    const ikanResponse = await fetch(`${BASE_URL}/ikan`);
    const ikanData = await ikanResponse.json();
    
    if (ikanResponse.ok) {
      console.log(`✅ Get all ikan: ${ikanData.data.length} ikan ditemukan`);
      if (ikanData.data.length > 0) {
        console.log('   Sample data:', ikanData.data[0].nama);
      }
    } else {
      console.log('❌ Get all ikan failed:', ikanData.message);
    }
    console.log('');

    // Test create ikan
    console.log('3. Testing create ikan...');
    const newIkan = {
      nama: 'Ikan Test',
      harga: 25000,
      satuanHarga: 'kg',
      stok: 10,
      status: 'tersedia',
      deskripsi: 'Ikan test untuk testing API'
    };

    const createResponse = await fetch(`${BASE_URL}/ikan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIkan),
    });

    const createData = await createResponse.json();
    
    if (createResponse.ok) {
      console.log('✅ Create ikan berhasil:', createData.message);
      console.log('   ID:', createData.data.id);
    } else {
      console.log('❌ Create ikan failed:', createData.message);
    }

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('💡 Pastikan backend server berjalan di port 3001');
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;
