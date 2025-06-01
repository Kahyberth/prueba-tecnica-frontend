"use client";

import { useState } from "react";
import { merchantsApi } from "../utils/merchants.api";
import { useToast } from "../contexts/ToastContext";

interface UseCSVExportReturn {
  isExporting: boolean;
  exportMerchantsCSV: () => Promise<void>;
}

export const useCSVExport = (): UseCSVExportReturn => {
  const [isExporting, setIsExporting] = useState(false);
  const { showSuccess, showError, showWarning } = useToast();

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const exportMerchantsCSV = async (): Promise<void> => {
    setIsExporting(true);

    try {
      showWarning("Generando reporte CSV...");

      const blob = await merchantsApi.exportMerchants();

      if (blob.size === 0) {
        throw new Error("El archivo generado está vacío");
      }

      const now = new Date();
      const timestamp = now.toISOString().split("T")[0];
      const time = now.toTimeString().split(" ")[0].replace(/:/g, "-");
      const filename = `reporte_comerciantes_${timestamp}_${time}.csv`;

      downloadBlob(blob, filename);

      showSuccess(`Reporte CSV descargado exitosamente: ${filename}`);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error desconocido al descargar el reporte CSV";
      showError(errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportMerchantsCSV,
  };
};
