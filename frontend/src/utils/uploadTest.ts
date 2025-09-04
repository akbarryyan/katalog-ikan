import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Utility untuk testing upload gambar
export const testImageUpload = async (file: File) => {
  try {
    console.log('🧪 Testing image upload...');
    console.log('📁 File info:', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    // Create FormData
    const formData = new FormData();
    formData.append('nama', 'Test Ikan Upload');
    formData.append('harga', '50000');
    formData.append('satuanHarga', 'kg');
    formData.append('stok', '10');
    formData.append('status', 'tersedia');
    formData.append('deskripsi', 'Ikan test untuk upload gambar');
    formData.append('gambar', file);

    // Send request
    const response = await axios.post(API_ENDPOINTS.ikan, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const result = response.data;

    console.log('✅ Upload berhasil!');
    console.log('📊 Response:', result);
    
    if (result.data && result.data.gambar) {
      console.log('🖼️  Gambar tersimpan di:', result.data.gambar);
      console.log('🔗 URL lengkap:', `http://localhost:3001${result.data.gambar}`);
    }
    
    return result;
  } catch (error) {
    console.error('💥 Error testing upload:', error);
    throw error;
  }
};

// Utility untuk membuat file test
export const createTestImageFile = (): File => {
  // Create a simple 1x1 pixel PNG as base64
  const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  
  // Convert base64 to blob
  const byteCharacters = atob(base64Image.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'image/png' });
  
  // Create file from blob
  const file = new File([blob], 'test-image.png', { type: 'image/png' });
  
  return file;
};

// Utility untuk testing upload dengan file test
export const testUploadWithTestFile = async () => {
  try {
    const testFile = createTestImageFile();
    console.log('📁 Test file created:', testFile);
    
    const result = await testImageUpload(testFile);
    return result;
  } catch (error) {
    console.error('💥 Error in test upload:', error);
    throw error;
  }
};
