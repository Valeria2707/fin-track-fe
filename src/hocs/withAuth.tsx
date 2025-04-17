'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { getCookie } from 'cookies-next';
import { ROUTES } from '@/constants/routes';
import Header from '@/components/layout/Header';

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const ProtectedComponent = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
      const isAuth = !!getCookie('accessToken');
      if (!isAuth) {
        router.replace(ROUTES.login);
      }
      setIsAuthenticated(isAuth);
    }, [router]);

    if (!isAuthenticated) {
      return null;
    }

    return (
      <>
        <Header />
        <WrappedComponent {...props} />
      </>
    );
  };

  return ProtectedComponent;
}
