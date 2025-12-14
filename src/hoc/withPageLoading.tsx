import { useEffect, useState } from 'react';
import React from 'react';
import Loading from '@/components/common/Loading';

export function withPageLoading<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const WithPageLoading: React.FC<P> = (props) => {
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

    if (showLoading) return <Loading show={true} />;

    return <WrappedComponent {...(props as P)} />;
  };

  WithPageLoading.displayName = `WithPageLoading(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithPageLoading;
}
