import { Fish } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner = ({ message = 'Memuat halaman...', size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8EAE5] via-white to-[#96BF8A]/10"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#96BF8A]/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#00412E]/10 rounded-full animate-pulse delay-300"></div>
      
      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Animated Fish Icon */}
        <div className="relative mb-6">
          <div className={`${sizeClasses[size]} mx-auto bg-gradient-to-br from-[#00412E] to-[#96BF8A] rounded-2xl shadow-2xl flex items-center justify-center animate-pulse`}>
            <Fish className="text-white animate-bounce" size={size === 'sm' ? 20 : size === 'md' ? 28 : 36} />
          </div>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00412E] to-[#96BF8A] opacity-20 animate-ping"></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className={`font-semibold text-[#00412E] ${textSizes[size]}`} style={{ fontFamily: 'Hanken Grotesk' }}>
            {message}
          </h3>
          
          {/* Animated Dots */}
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-[#96BF8A] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#96BF8A] rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-[#96BF8A] rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6 w-48 mx-auto">
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00412E] to-[#96BF8A] rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
