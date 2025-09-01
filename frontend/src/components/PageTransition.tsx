import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface PageTransitionProps {
  children: React.ReactNode;
  isLoading: boolean;
  loadingMessage?: string;
}

const PageTransition = ({ children, isLoading, loadingMessage }: PageTransitionProps) => {
  const [showContent, setShowContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowContent(false);
      setIsTransitioning(true);
    } else {
      // Delay showing content for smooth transition
      const timer = setTimeout(() => {
        setShowContent(true);
        setIsTransitioning(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading || isTransitioning) {
    return <LoadingSpinner message={loadingMessage} size="lg" />;
  }

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        showContent 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
