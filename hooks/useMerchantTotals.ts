'use client';

import { useState, useCallback } from 'react';
import { merchantsApi } from '../utils/merchants.api';
import { type MerchantTotals } from '../schemas/merchant.schemas';

interface UseMerchantTotalsReturn {
  totals: MerchantTotals | null;
  isLoading: boolean;
  error: string | null;
  fetchTotals: (merchantId: number) => Promise<void>;
  clearTotals: () => void;
}

export const useMerchantTotals = (): UseMerchantTotalsReturn => {
  const [totals, setTotals] = useState<MerchantTotals | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTotals = useCallback(async (merchantId: number): Promise<void> => {
    if (!merchantId) return;

    setIsLoading(true);
    setError(null);

    try {
      const merchantTotals = await merchantsApi.getMerchantTotals(merchantId);
      setTotals(merchantTotals);
    } catch (error) {
      console.error('Error fetching merchant totals:', error);
      setError('Error al cargar los totales del merchant');
      setTotals(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearTotals = useCallback(() => {
    setTotals(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    totals,
    isLoading,
    error,
    fetchTotals,
    clearTotals,
  };
}; 