import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { useCartInit } from './hooks/useCartInit.hooks';
import { useEffect, useState } from 'react';
import LoadingWithLogo from './components/common/LoadingWithLogo';

function App() {
  useCartInit();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const MIN_LOADING_TIME = 500;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => setShowLoading(false), remaining);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  if (showLoading) {
    return <LoadingWithLogo show={true} />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
