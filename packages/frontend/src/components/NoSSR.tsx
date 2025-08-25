import React, { useState, useEffect, ReactNode } from 'react';

interface NoSSRProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * NoSSR component prevents server-side rendering of its children
 * to avoid hydration mismatches for client-only components
 */
export const NoSSR: React.FC<NoSSRProps> = ({ children, fallback = null }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
