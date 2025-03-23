'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { getCookie } from 'cookies-next';
import { ROUTES } from '@/constants/routes';
import Header from '@/components/Layout/Header';

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const ProtectedComponent = (props: P) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
      const token = getCookie('accessToken');
      if (!token) {
        router.replace(ROUTES.login);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
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
