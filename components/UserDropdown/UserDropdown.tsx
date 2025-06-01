"use client";

import { Settings, LogOut, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import "./UserDropdown.css";

interface UserDropdownProps {
  onClose: () => void;
}

export default function UserDropdown({ onClose }: UserDropdownProps) {
  const { user, logout } = useAuth();

  const handleSettings = () => {
    console.log("Settings clicked");
    onClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className="user-dropdown">
        <div className="dropdown-header">
          <div className="dropdown-user-name">{user?.nombre || 'John Doe'}</div>
          <div className="dropdown-user-email">{user?.correoElectronico || 'john.doe@empresa.com'}</div>
          <div className="dropdown-user-role">{user?.rol || 'Administrador'}</div>
        </div>

        <div className="dropdown-menu">
          <button className="dropdown-item">
            <User className="dropdown-item-icon" />
            <span>Actualizar información</span>
          </button>

          <button className="dropdown-item" onClick={handleSettings}>
            <Settings className="dropdown-item-icon" />
            <span>Configuración</span>
          </button>

          <div className="dropdown-divider"></div>
          <button className="dropdown-item danger" onClick={handleLogout}>
            <LogOut className="dropdown-item-icon" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
      <div className="dropdown-overlay" onClick={onClose}></div>
    </>
  );
}
