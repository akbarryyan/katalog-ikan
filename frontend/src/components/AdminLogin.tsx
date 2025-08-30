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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Hanken Grotesk' }}>
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600" style={{ fontFamily: 'Hanken Grotesk' }}>
            Masuk ke panel admin untuk mengelola katalog ikan
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Masukkan username"
                style={{ fontFamily: 'Hanken Grotesk' }}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Hanken Grotesk' }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Masukkan password"
                style={{ fontFamily: 'Hanken Grotesk' }}
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
              style={{ fontFamily: 'Hanken Grotesk' }}
            >
              Masuk
            </button>
          </form>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500" style={{ fontFamily: 'Hanken Grotesk' }}>
            Demo: username: admin, password: admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
