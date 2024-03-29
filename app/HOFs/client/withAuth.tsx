'use client';
import React, { ComponentType, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function withAuth(Component: ComponentType) {
  return function ProtectedRoute(props: any) {
    const { data, status } = useSession();

    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return;
      if (status === 'unauthenticated') {
        router.push('/auth');
      }
    }, [status, router]);

    if (status === 'authenticated') {
      return <Component {...props} />;
    }

    return null;
  };
}

export default withAuth;
