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
                {/* Username Field */}
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-700 uppercase tracking-wide" style={{ fontFamily: 'Hanken Grotesk' }}>
                    Username
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full pl-16 pr-5 py-3 bg-gray-50/80 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300 hover:bg-gray-100 hover:border-gray-300 hover:shadow-md"
                      placeholder="Masukkan username Anda"
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
                    className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white py-3 px-6 rounded-2xl font-bold text-lg hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl relative overflow-hidden group"
                    style={{ fontFamily: 'Hanken Grotesk' }}
                  >
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Button Content */}
                    <span className="relative flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-lg mr-3 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-sm">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      Masuk ke Dashboard
                    </span>
                  </button>
                </div>
              </form>
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
