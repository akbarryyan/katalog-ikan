import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLoading?: boolean;
  loadingMessage?: string;
}

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showLoading = false,
  loadingMessage = 'Memuat...'
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  // Set CSS custom property for max-width
  useEffect(() => {
    if (isOpen) {
      const maxWidth = sizeClasses[size].replace('max-w-', '');
      const widthMap: Record<string, string> = {
        'md': '28rem',
        'lg': '56rem',
        'xl': '72rem',
        'sm': '24rem'
      };
      document.documentElement.style.setProperty('--modal-max-width', widthMap[maxWidth] || '42rem');
    }
  }, [isOpen, size]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Restore body scroll
        document.body.style.overflow = 'unset';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="modal-overlay-alt">
      {/* Backdrop with blur effect */}
      <div 
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={`modal-wrapper-alt transition-all duration-300 ${
        isAnimating 
          ? 'opacity-100 scale-100' 
          : 'opacity-0 scale-95'
      }`}>
        {/* Modal Content */}
        <div className="modal-content">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-[#00412E]/5 to-[#96BF8A]/5 flex-shrink-0">
            <h2 className="text-xl font-bold text-[#00412E]" style={{ fontFamily: 'Hanken Grotesk' }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Body */}
          <div className="relative flex-1 overflow-y-auto">
            {showLoading ? (
              <div className="p-12 flex items-center justify-center min-h-[300px]">
                <LoadingSpinner message={loadingMessage} size="md" />
              </div>
            ) : (
              <div className="p-6">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
