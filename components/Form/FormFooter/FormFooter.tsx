"use client"

import { useState, useEffect } from "react"
import Button from "@/components/Button/Button"
import { useMerchantTotals } from "@/hooks/useMerchantTotals"
import UpdateConfirmModal from "@/components/Modal/UpdateConfirmModal"
import "./FormFooter.css"

interface FormFooterProps {
  onSubmit: () => Promise<boolean>;
  isSubmitting: boolean;
  isEditMode: boolean;
  merchantId?: number | null;
  getChangedFields?: () => Array<{
    field: string;
    label: string;
    originalValue: string;
    newValue: string;
  }>;
}

export default function FormFooter({ 
  onSubmit, 
  isSubmitting, 
  isEditMode, 
  merchantId,
  getChangedFields
}: FormFooterProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { totals, isLoading, fetchTotals } = useMerchantTotals();


  useEffect(() => {
    if (isEditMode && merchantId) {
      fetchTotals(merchantId);
    }
  }, [isEditMode, merchantId, fetchTotals]);


  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('es-CO').format(num);
  };

  const handleUpdateClick = () => {
    const changes = getChangedFields?.() || [];
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    setIsUpdating(true);
    try {
      const success = await onSubmit();
      if (success) {
        setShowConfirmModal(false);
      }
    } catch (error) {
      console.error('Error updating merchant:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCloseModal = () => {
    if (!isUpdating) {
      setShowConfirmModal(false);
    }
  };

  if (!isEditMode) {
    return null;
  }

  const changes = getChangedFields?.() || [];

  return (
    <>
      <footer className="form-footer">
        <div className="footer-content">
          <div className="footer-stats">
            <div className="stat-item">
              <span className="stat-label">Total Ingresos Formulario:</span>
              <span className="stat-value">
                {isLoading ? (
                  <span className="loading-stat">Cargando...</span>
                ) : totals ? (
                  formatCurrency(totals.totalIngresos)
                ) : (
                  "$0"
                )}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Cantidad de empleados:</span>
              <span className="stat-value">
                {isLoading ? (
                  <span className="loading-stat">Cargando...</span>
                ) : totals ? (
                  formatNumber(totals.totalEmpleados)
                ) : (
                  "0"
                )}
              </span>
            </div>
          </div>

          <div className="footer-actions">
            <p className="footer-message">
              Si ya modificaste todos los datos, actualiza el formulario aquí
            </p>
            <Button 
              variant="primary" 
              onClick={handleUpdateClick}
              disabled={isSubmitting || isUpdating}
            >
              {isSubmitting || isUpdating ? "Actualizando..." : "Actualizar Formulario"}
            </Button>
          </div>
        </div>
      </footer>

      <UpdateConfirmModal
        isOpen={showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmUpdate}
        changes={changes}
        isLoading={isUpdating}
      />
    </>
  )
}
