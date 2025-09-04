import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AdminRouter from './AdminRouter';

// Main router component that handles routing between user and admin
const MainRouter: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Listen for URL changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update path when it changes
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [currentPath]);

  // Route based on current path
  if (currentPath.startsWith('/sys')) {
    return <AdminRouter />;
  } else {
    return <HomePage />;
  }
};

export default MainRouter;
