'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { getCookie } from 'cookies-next';
import { ROUTES } from '@/constants/routes';

export function withPublic<P extends object>(WrappedComponent: ComponentType<P>) {
  const PublicComponent = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
      const token = getCookie('accessToken');
      const isAuth = !!token;
      setIsAuthenticated(isAuth);

      if (isAuth) {
        router.replace(ROUTES.dashboard);
      }
    }, [router]);

    if (isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return PublicComponent;
}
