import { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  type = 'danger',
  loading = false
}: ConfirmModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
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
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
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
      window.scrollTo(0, parseInt(scrollY));
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconColor: '#ef4444',
          iconBg: '#fef2f2',
          confirmBg: '#ef4444',
          confirmHover: '#dc2626'
        };
      case 'warning':
        return {
          iconColor: '#f59e0b',
          iconBg: '#fffbeb',
          confirmBg: '#f59e0b',
          confirmHover: '#d97706'
        };
      case 'info':
        return {
          iconColor: '#3b82f6',
          iconBg: '#eff6ff',
          confirmBg: '#3b82f6',
          confirmHover: '#2563eb'
        };
      default:
        return {
          iconColor: '#ef4444',
          iconBg: '#fef2f2',
          confirmBg: '#ef4444',
          confirmHover: '#dc2626'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`modal-overlay-alt transition-opacity duration-300 ${
      isAnimating ? 'opacity-100' : 'opacity-0'
    }`} onClick={onClose}>
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
            <div className="p-6">
              {/* Icon and Message */}
              <div className="flex items-start gap-4 mb-6">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: styles.iconBg }}
                >
                  <AlertTriangle 
                    size={24} 
                    style={{ color: styles.iconColor }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Hanken Grotesk' }}>
                    {message}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Hanken Grotesk' }}
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className="px-6 py-3 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  style={{ 
                    backgroundColor: styles.confirmBg,
                    fontFamily: 'Hanken Grotesk'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = styles.confirmHover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = styles.confirmBg;
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Menghapus...</span>
                    </>
                  ) : (
                    confirmText
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
