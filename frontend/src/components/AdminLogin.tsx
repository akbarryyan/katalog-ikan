import { useState } from 'react';

interface AdminLoginProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
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
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-blue-600 text-2xl font-bold">A</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Hanken Grotesk' }}>
              Admin Panel
            </h1>
            <p className="text-gray-600 text-lg" style={{ fontFamily: 'Hanken Grotesk' }}>
              Kelola Katalog Ikan
            </p>
          </div>
          
          {/* Login Form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Card Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-50 to-pink-100 rounded-full translate-y-12 -translate-x-12 opacity-60"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Masuk ke Dashboard
                </h2>
                <p className="text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
                  Masukkan kredensial Anda untuk melanjutkan
                </p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Username Field */}
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Username
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <span className="text-white text-xs font-bold">U</span>
                      </div>
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:bg-gray-100 hover:border-gray-300"
                      placeholder="Masukkan username"
                      style={{ fontFamily: 'Hanken Grotesk' }}
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:bg-gray-100 hover:border-gray-300"
                      placeholder="Masukkan password"
                      style={{ fontFamily: 'Hanken Grotesk' }}
                    />
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl relative overflow-hidden group"
                  style={{ fontFamily: 'Hanken Grotesk' }}
                >
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <span className="relative flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded mr-2 flex items-center justify-center group-hover:rotate-12 transition-transform duration-200">
                      <span className="text-blue-600 text-xs font-bold">→</span>
                    </div>
                    Masuk ke Dashboard
                  </span>
                </button>
              </form>
            </div>
          </div>
          
          {/* Demo Credentials */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-2 flex items-center justify-center">
                <span className="text-white text-xs">i</span>
              </div>
              <span className="text-gray-700 text-sm" style={{ fontFamily: 'Hanken Grotesk' }}>
                Demo: <span className="font-semibold text-blue-600">admin</span> / <span className="font-semibold text-blue-600">admin123</span>
              </span>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Hanken Grotesk' }}>
              © 2024 Katalog Ikan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
