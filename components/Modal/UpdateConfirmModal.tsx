"use client";

import { X, AlertTriangle, Check } from "lucide-react";
import "./UpdateConfirmModal.css";

interface FieldChange {
  field: string;
  label: string;
  originalValue: string;
  newValue: string;
}

interface UpdateConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  changes: FieldChange[];
  isLoading?: boolean;
}

export default function UpdateConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  changes,
  isLoading = false,
}: UpdateConfirmModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="modal-overlay">
      <div className="update-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <AlertTriangle size={24} className="icon-warning" />
          </div>
          <h2 className="modal-title">Confirmar Actualización</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <p className="modal-description">
            ¿Estás seguro de que deseas actualizar la información del merchant? 
            Los siguientes campos serán modificados:
          </p>

          <div className="changes-list">
            {changes.length === 0 ? (
              <div className="no-changes">
                <p>No se detectaron cambios en los datos.</p>
              </div>
            ) : (
              changes.map((change, index) => (
                <div key={index} className="change-item">
                  <div className="change-header">
                    <span className="field-label">{change.label}</span>
                  </div>
                  <div className="change-values">
                    <div className="value-container">
                      <span className="value-label">Valor actual:</span>
                      <span className="original-value">
                        {change.originalValue || 'Sin valor'}
                      </span>
                    </div>
                    <div className="value-container">
                      <span className="value-label">Nuevo valor:</span>
                      <span className="new-value">
                        {change.newValue || 'Sin valor'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="btn btn-cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button 
            className="btn btn-confirm"
            onClick={handleConfirm}
            disabled={isLoading || changes.length === 0}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Actualizando...
              </>
            ) : (
              <>
                <Check size={16} />
                Confirmar Actualización
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 