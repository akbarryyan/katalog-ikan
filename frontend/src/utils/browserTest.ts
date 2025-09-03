// Utility untuk testing upload di browser console
export const browserTestUpload = () => {
  console.log('🧪 Browser Upload Test Utility');
  console.log('📋 Available functions:');
  console.log('  - testUploadWithFile()');
  console.log('  - testUploadWithTestImage()');
  console.log('  - checkUploadFolder()');
  console.log('  - testImageDisplay()');
};

// Test upload dengan file yang dipilih user
export const testUploadWithFile = async () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }

      try {
        console.log('📁 Selected file:', {
          name: file.name,
          size: file.size,
          type: file.type
        });

        const formData = new FormData();
        formData.append('nama', 'Test Ikan Upload');
        formData.append('harga', '50000');
        formData.append('satuanHarga', 'kg');
        formData.append('stok', '10');
        formData.append('status', 'tersedia');
        formData.append('deskripsi', 'Ikan test untuk upload gambar');
        formData.append('gambar', file);

        const response = await fetch('http://localhost:3001/api/ikan', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();
        
        if (response.ok) {
          console.log('✅ Upload berhasil!');
          console.log('📊 Response:', result);
          
          if (result.data && result.data.gambar) {
            console.log('🖼️  Gambar URL:', `http://localhost:3001${result.data.gambar}`);
          }
          
          resolve(result);
        } else {
          console.log('❌ Upload gagal!');
          console.log('📊 Error:', result);
          reject(new Error(result.message || 'Upload failed'));
        }
      } catch (error) {
        console.error('💥 Error:', error);
        reject(error);
      }
    };
    
    input.click();
  });
};

// Test upload dengan gambar test
export const testUploadWithTestImage = async () => {
  try {
    // Create a simple 1x1 pixel PNG
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(0, 0, 1, 1);
    }
    
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/png');
    });
    
    const file = new File([blob], 'test-image.png', { type: 'image/png' });
    
    console.log('📁 Test file created:', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    const formData = new FormData();
    formData.append('nama', 'Test Ikan Upload');
    formData.append('harga', '50000');
    formData.append('satuanHarga', 'kg');
    formData.append('stok', '10');
    formData.append('status', 'tersedia');
    formData.append('deskripsi', 'Ikan test untuk upload gambar');
    formData.append('gambar', file);

    const response = await fetch('http://localhost:3001/api/ikan', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Upload berhasil!');
      console.log('📊 Response:', result);
      
      if (result.data && result.data.gambar) {
        console.log('🖼️  Gambar URL:', `http://localhost:3001${result.data.gambar}`);
      }
      
      return result;
    } else {
      console.log('❌ Upload gagal!');
      console.log('📊 Error:', result);
      throw new Error(result.message || 'Upload failed');
    }
  } catch (error) {
    console.error('💥 Error:', error);
    throw error;
  }
};

// Check apakah folder upload bisa diakses
export const checkUploadFolder = async () => {
  try {
    const response = await fetch('http://localhost:3001/uploads/ikan/');
    console.log('📁 Upload folder status:', response.status);
    
    if (response.ok) {
      console.log('✅ Upload folder accessible');
    } else {
      console.log('❌ Upload folder not accessible');
    }
    
    return response.ok;
  } catch (error) {
    console.error('💥 Error checking upload folder:', error);
    return false;
  }
};

// Test menampilkan gambar
export const testImageDisplay = (imageUrl: string) => {
  const img = document.createElement('img');
  img.src = imageUrl;
  img.style.width = '200px';
  img.style.height = '200px';
  img.style.border = '2px solid #000';
  img.style.margin = '10px';
  
  img.onload = () => {
    console.log('✅ Image loaded successfully');
  };
  
  img.onerror = () => {
    console.log('❌ Image failed to load');
  };
  
  document.body.appendChild(img);
  console.log('🖼️  Test image added to page');
};

// Export untuk global access
(window as any).testUploadWithFile = testUploadWithFile;
(window as any).testUploadWithTestImage = testUploadWithTestImage;
(window as any).checkUploadFolder = checkUploadFolder;
(window as any).testImageDisplay = testImageDisplay;
(window as any).browserTestUpload = browserTestUpload;