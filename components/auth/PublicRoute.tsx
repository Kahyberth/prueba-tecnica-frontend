'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../Loader/Loader';

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };
    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <Loader message="Verificando acceso..." />;
  }

  if (isAuthenticated) {
    return <Loader message="Usuario autenticado, redirigiendo..." />;
  }

  return <>{children}</>;
}

export const withPublicRoute = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const PublicComponent: React.FC<P> = (props) => {
    return (
      <PublicRoute>
        <Component {...props} />
      </PublicRoute>
    );
  };

  PublicComponent.displayName = `withPublicRoute(${Component.displayName || Component.name})`;

  return PublicComponent;
}; 