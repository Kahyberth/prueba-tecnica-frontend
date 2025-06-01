"use client";

import { useState, useCallback } from "react";
import { merchantsApi } from "../utils/merchants.api";
import type {
  MerchantsResponse,
  MerchantsQueryParams,
  Merchant,
  CreateMerchant,
  UpdateMerchant,
  UpdateMerchantStatus,
} from "../utils/merchants.api";

interface UseMerchantsState {
  merchants: Merchant[];
  meta: MerchantsResponse["meta"] | null;
  isLoading: boolean;
  error: string | null;
}

interface UseMerchantsReturn extends UseMerchantsState {
  fetchMerchants: (params?: MerchantsQueryParams) => Promise<void>;
  createMerchant: (data: CreateMerchant) => Promise<void>;
  updateMerchant: (id: number, data: UpdateMerchant) => Promise<void>;
  updateMerchantStatus: (
    id: number,
    data: UpdateMerchantStatus
  ) => Promise<void>;
  deleteMerchant: (id: number) => Promise<void>;
  clearError: () => void;
  refreshMerchants: () => Promise<void>;
}

export const useMerchants = (
  initialParams?: MerchantsQueryParams
): UseMerchantsReturn => {
  const [state, setState] = useState<UseMerchantsState>({
    merchants: [],
    meta: null,
    isLoading: false,
    error: null,
  });

  const [currentParams, setCurrentParams] = useState<MerchantsQueryParams>(
    initialParams || { page: 1, limit: 5 }
  );

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  const fetchMerchants = useCallback(
    async (params?: MerchantsQueryParams) => {
      const queryParams = params || currentParams;
      setCurrentParams(queryParams);
      setLoading(true);
      setError(null);

      try {
        const response = await merchantsApi.getMerchants(queryParams);
        setState((prev) => ({
          ...prev,
          merchants: response.data,
          meta: response.meta,
          isLoading: false,
        }));
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error al obtener merchants";
        setError(errorMessage);
        setLoading(false);
      }
    },
    [currentParams, setLoading, setError]
  );

  const refreshMerchants = useCallback(async () => {
    await fetchMerchants(currentParams);
  }, [fetchMerchants, currentParams]);

  const createMerchant = useCallback(
    async (data: CreateMerchant) => {
      setLoading(true);
      setError(null);

      try {
        await merchantsApi.createMerchant(data);
        await refreshMerchants();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error al crear merchant";
        setError(errorMessage);
        setLoading(false);
      }
    },
    [refreshMerchants, setLoading, setError]
  );

  const updateMerchant = useCallback(
    async (id: number, data: UpdateMerchant) => {
      setLoading(true);
      setError(null);

      try {
        await merchantsApi.updateMerchant(id, data);
        await refreshMerchants();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Error al actualizar merchant";
        setError(errorMessage);
        setLoading(false);
      }
    },
    [refreshMerchants, setLoading, setError]
  );

  const updateMerchantStatus = useCallback(
    async (id: number, data: UpdateMerchantStatus) => {
      setLoading(true);
      setError(null);

      try {
        await merchantsApi.updateMerchantStatus(id, data);
        await refreshMerchants();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Error al actualizar estado del merchant";
        setError(errorMessage);
        setLoading(false);
      }
    },
    [refreshMerchants, setLoading, setError]
  );

  const deleteMerchant = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);

      try {
        await merchantsApi.deleteMerchant(id);
        await refreshMerchants();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error al eliminar merchant";
        setError(errorMessage);
        setLoading(false);
      }
    },
    [refreshMerchants, setLoading, setError]
  );

  return {
    ...state,
    fetchMerchants,
    createMerchant,
    updateMerchant,
    updateMerchantStatus,
    deleteMerchant,
    clearError,
    refreshMerchants,
  };
};

export const useMerchant = (id: number) => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMerchant = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await merchantsApi.getMerchantById(id);
      setMerchant(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al obtener merchant";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  return {
    merchant,
    isLoading,
    error,
    fetchMerchant,
    clearError: () => setError(null),
  };
};
