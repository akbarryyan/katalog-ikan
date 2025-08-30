import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AdminLoginProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Email dan password harus diisi!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        // Simpan token dan data admin ke localStorage
        localStorage.setItem('adminToken', result.data.token);
        localStorage.setItem('adminUser', JSON.stringify(result.data.admin));
        
        toast.success('🎉 ' + result.message + ' Mengalihkan ke dashboard...', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Delay redirect agar toast notification tampil dulu
        setTimeout(() => {
          // Panggil onLogin dengan data dari backend
          onLogin({
            email: result.data.admin.email,
            password: formData.password // Password tidak disimpan, hanya untuk compatibility
          });
        }, 1500); // Delay 1.5 detik agar toast tampil
      } else {
        toast.error(result.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat login. Silakan coba lagi.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-100 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-100 rounded-full blur-lg animate-pulse delay-500"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Card Background Pattern */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-full -translate-y-20 translate-x-20 opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-50 via-purple-50 to-indigo-50 rounded-full translate-y-16 -translate-x-16 opacity-70"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-full opacity-50"></div>
            
            <div className="relative z-10 p-10">
              {/* Header Section */}
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Masuk ke Dashboard
                </h2>
                <p className="text-gray-500 text-lg" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Masukkan kredensial Anda untuk melanjutkan
                </p>
              </div>
              
              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 uppercase tracking-wide" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-16 pr-5 py-3 bg-gray-50/80 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:bg-gray-100 hover:border-gray-300 hover:shadow-md"
                      placeholder="Masukkan email Anda"
                      style={{ fontFamily: 'Hanken Grotesk' }}
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 uppercase tracking-wide" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-16 pr-5 py-3 bg-gray-50/80 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:bg-gray-100 hover:border-gray-300 hover:shadow-md"
                      placeholder="Masukkan password Anda"
                      style={{ fontFamily: 'Hanken Grotesk' }}
                    />
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-6 rounded-2xl font-bold text-lg text-white focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 transform shadow-xl relative overflow-hidden group ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed shadow-lg'
                        : 'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl'
                    }`}
                    style={{ fontFamily: 'Hanken Grotesk' }}
                  >
                    {/* Button Shine Effect */}
                    {!isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    )}
                    
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center">
                      {isLoading ? (
                        <>
                          {/* Loading Spinner */}
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Memproses Login...
                        </>
                      ) : (
                        <>
                          <div className="w-6 h-6 bg-white rounded-lg mr-3 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-sm">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                          </div>
                          Masuk ke Dashboard
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Hanken Grotesk' }}>
              © 2025 Made with 🖤 by akbar.
            </p>
          </div>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default AdminLogin;
