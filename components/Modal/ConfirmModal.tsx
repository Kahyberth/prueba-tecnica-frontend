"use client"

import { X, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import "./ConfirmModal.css"

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  type?: "warning" | "danger" | "info"
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  type = "warning",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  isLoading = false
}: ConfirmModalProps) {
  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case "danger":
        return <XCircle size={24} className="modal-icon modal-icon--danger" />
      case "info":
        return <CheckCircle size={24} className="modal-icon modal-icon--info" />
      default:
        return <AlertTriangle size={24} className="modal-icon modal-icon--warning" />
    }
  }

  const getConfirmButtonClass = () => {
    switch (type) {
      case "danger":
        return "modal-btn modal-btn--danger"
      case "info":
        return "modal-btn modal-btn--primary"
      default:
        return "modal-btn modal-btn--warning"
    }
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-container">
            {getIcon()}
            <h3 className="modal-title">{title}</h3>
          </div>
          <button 
            className="modal-close-btn" 
            onClick={onCancel}
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-message">{message}</p>
        </div>
        
        <div className="modal-footer">
          <button 
            className="modal-btn modal-btn--secondary" 
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button 
            className={getConfirmButtonClass()}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
} 