"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import ConfirmModal from "../components/Modal/ConfirmModal";

interface ConfirmModalData {
  title: string;
  message: string;
  type?: "warning" | "danger" | "info";
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

interface ConfirmModalContextType {
  showConfirm: (options: ConfirmModalData) => void;
  hideConfirm: () => void;
}

const ConfirmModalContext = createContext<ConfirmModalContextType | null>(null);

export const ConfirmModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalData, setModalData] = useState<ConfirmModalData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showConfirm = useCallback((options: ConfirmModalData) => {
    setModalData(options);
  }, []);

  const hideConfirm = useCallback(() => {
    setModalData(null);
    setIsLoading(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!modalData) return;

    setIsLoading(true);
    try {
      await modalData.onConfirm();
      hideConfirm();
    } catch (error) {
      console.error("Error in confirmation action:", error);
      setIsLoading(false);
    }
  }, [modalData, hideConfirm]);

  const handleCancel = useCallback(() => {
    if (modalData?.onCancel) {
      modalData.onCancel();
    }
    hideConfirm();
  }, [modalData, hideConfirm]);

  const value: ConfirmModalContextType = {
    showConfirm,
    hideConfirm,
  };

  return (
    <ConfirmModalContext.Provider value={value}>
      {children}
      {modalData && (
        <ConfirmModal
          isOpen={true}
          title={modalData.title}
          message={modalData.message}
          type={modalData.type}
          confirmText={modalData.confirmText}
          cancelText={modalData.cancelText}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      )}
    </ConfirmModalContext.Provider>
  );
};

export const useConfirmModal = (): ConfirmModalContextType => {
  const context = useContext(ConfirmModalContext);

  if (!context) {
    throw new Error("useConfirmModal must be used within a ConfirmModalProvider");
  }

  return context;
}; 