"use client";

import {
  Pencil,
  CheckCircle,
  XCircle,
  Trash2,
  Download,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMerchants } from "@/hooks/useMerchants";
import { useToast } from "@/contexts/ToastContext";
import { useConfirmModal } from "@/contexts/ConfirmModalContext";
import { useAuth } from "@/contexts/AuthContext";
import "./ActionButton.css";

interface ActionButtonsProps {
  status?: string;
  companyId?: number;
  onStatusChange?: () => void;
  onDelete?: () => void;
}

export default function ActionButtons({
  status = "ACTIVO",
  companyId,
  onStatusChange,
  onDelete,
}: ActionButtonsProps) {
  const router = useRouter();
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const { updateMerchantStatus, deleteMerchant } = useMerchants();
  const { showSuccess, showError } = useToast();
  const { showConfirm } = useConfirmModal();
  const { user } = useAuth();

  const isActive = status === "ACTIVO";
  const isAdmin = user?.rol === "Administrador";

  const handleEdit = () => {
    if (!companyId) return;

    setIsLoadingEdit(true);

    setTimeout(() => {
      router.push(`/dashboard/create-form?edit=${companyId}`);
    }, 800);
  };

  const handleStatusChange = () => {
    if (!companyId) return;

    const actionText = isActive ? "desactivar" : "activar";
    const newStatus = isActive ? "INACTIVO" : "ACTIVO";

    showConfirm({
      title: `${
        actionText.charAt(0).toUpperCase() + actionText.slice(1)
      } Merchant`,
      message: `¿Estás seguro de que quieres ${actionText} este merchant? Esto cambiará su estado a ${newStatus}.`,
      type: "warning",
      confirmText: actionText.charAt(0).toUpperCase() + actionText.slice(1),
      cancelText: "Cancelar",
      onConfirm: async () => {
        setIsLoadingStatus(true);
        try {
          await updateMerchantStatus(companyId, { estado: newStatus });

          const successMessage = isActive
            ? "Merchant desactivado exitosamente"
            : "Merchant activado exitosamente";
          showSuccess(successMessage);

          onStatusChange?.();
        } catch (error) {
          console.error("Error al cambiar estado:", error);
          showError("Error al cambiar el estado del merchant");
        } finally {
          setIsLoadingStatus(false);
        }
      },
    });
  };

  const handleDelete = () => {
    if (!companyId) return;

    showConfirm({
      title: "Eliminar Merchant",
      message:
        "¿Estás seguro de que quieres eliminar este merchant? Esta acción no se puede deshacer y se perderán todos los datos asociados.",
      type: "danger",
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      onConfirm: async () => {
        setIsLoadingDelete(true);
        try {
          await deleteMerchant(companyId);
          showSuccess("Merchant eliminado exitosamente");
          onDelete?.();
        } catch (error) {
          console.error("Error al eliminar:", error);
          showError("Error al eliminar el merchant");
        } finally {
          setIsLoadingDelete(false);
        }
      },
    });
  };

  return (
    <div className="action-buttons">
      <button
        className="action-btn action-btn--edit"
        title="Editar"
        onClick={handleEdit}
        disabled={isLoadingEdit}
      >
        {isLoadingEdit ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Pencil size={14} />
        )}
      </button>

      <button
        className="action-btn action-btn--status"
        title="Cambiar Estado"
        onClick={handleStatusChange}
        disabled={isLoadingStatus}
      >
        {isLoadingStatus ? (
          <Loader2 size={14} className="animate-spin" />
        ) : isActive ? (
          <CheckCircle size={14} />
        ) : (
          <XCircle size={14} />
        )}
      </button>

      {isAdmin && (
        <button
          className="action-btn action-btn--delete"
          title="Eliminar"
          onClick={handleDelete}
          disabled={isLoadingDelete}
        >
          {isLoadingDelete ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Trash2 size={14} />
          )}
        </button>
      )}
    </div>
  );
}
