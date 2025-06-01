"use client";

import { ShieldX, Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import "./unauthorized.css";

export default function UnauthorizedPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/login");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="main-card">
          <div className="icon-container">
            <ShieldX className="icon" />
          </div>

          <h1 className="title">Acceso No Autorizado</h1>

          <p className="subtitle">401 - Unauthorized</p>

          <p className="description">
            Lo sentimos, no tienes permisos para acceder a esta página o tu sesión ha expirado. Por
            favor, inicia sesión con las credenciales correctas o contacta al
            administrador.
          </p>

          <div className="button-container">
            <button onClick={handleGoHome} className="primary-button">
              <Home className="button-icon" />
              <span>Ir al Inicio</span>
            </button>

            <button onClick={handleGoBack} className="secondary-button">
              <ArrowLeft className="button-icon" />
              <span>Volver Atrás</span>
            </button>
          </div>
        </div>

        <div className="additional-info">
          <p className="help-text">
            ¿Necesitas ayuda?
            <a href="mailto:admin@example.com" className="support-link">
              Contacta soporte
            </a>
          </p>
        </div>

        <div className="decoration-1"></div>
        <div className="decoration-2"></div>
        <div className="decoration-3"></div>
      </div>
    </div>
  );
}
