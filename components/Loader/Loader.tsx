'use client';

import '../auth/ProtectedRoute.css';

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = 'Cargando...' }: LoaderProps) {
  return (
    <div className="protected-route-loading">
      <div className="loading-container">
        <div className="spinner"></div>
        <p>{message}</p>
      </div>
    </div>
  );
} 