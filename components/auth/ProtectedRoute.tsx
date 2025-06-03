'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Loader from '../Loader/Loader';
import './ProtectedRoute.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  fallback 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/unauthorized');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return fallback || <Loader message="Verificando acceso..." />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return <>{children}</>;
}

export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    fallback?: React.ReactNode;
    redirectTo?: string;
    requireAuth?: boolean;
  }
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return AuthenticatedComponent;
}; 