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
      
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.setAttribute('data-scroll-y', scrollY.toString());
      
      // Lock body scroll completely
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      
      // Force scroll to top to ensure modal is visible
      window.scrollTo(0, 0);
      
      // Additional viewport centering
      setTimeout(() => {
        const modalOverlay = document.querySelector('.modal-overlay-alt') as HTMLElement;
        if (modalOverlay) {
          // Force modal to be in viewport center
          modalOverlay.style.position = 'fixed';
          modalOverlay.style.top = '0';
          modalOverlay.style.left = '0';
          modalOverlay.style.right = '0';
          modalOverlay.style.bottom = '0';
          modalOverlay.style.zIndex = '100000';
        }
      }, 10);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        
        // Restore body scroll and position
        const scrollY = document.body.getAttribute('data-scroll-y') || '0';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.overflow = '';
        document.body.style.margin = '';
        document.body.style.padding = '';
        document.body.removeAttribute('data-scroll-y');
        
        // Restore scroll position
        window.scrollTo(0, parseInt(scrollY));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div 
      className={`modal-overlay-alt transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`} 
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className={`modal-wrapper-alt transition-all duration-300 ${
          isAnimating 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
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
