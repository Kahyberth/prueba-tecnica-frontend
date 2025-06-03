import { apiClient } from "./auth";
import { axiosInstance } from "./axios.config";
import axios from "axios";
import {
  MerchantsResponseSchema,
  MerchantsQueryParamsSchema,
  CreateMerchantSchema,
  UpdateMerchantSchema,
  UpdateMerchantStatusSchema,
  MerchantSchema,
  MerchantTotalsSchema,
  type MerchantsResponse,
  type MerchantsQueryParams,
  type CreateMerchant,
  type UpdateMerchant,
  type UpdateMerchantStatus,
  type Merchant,
  type MerchantTotals,
} from "../schemas/merchant.schemas";
import { DepartmentsCitiesResponseSchema, type DepartmentsCitiesResponse } from "../schemas/form.schemas";

export const merchantsApi = {
  async getMerchants(
    params?: MerchantsQueryParams
  ): Promise<MerchantsResponse> {
    const validatedParams = MerchantsQueryParamsSchema.parse(params || {});

    const queryString = new URLSearchParams({
      page: validatedParams.page.toString(),
      limit: validatedParams.limit.toString(),
    }).toString();

    return apiClient.get<MerchantsResponse>(
      `/merchants?${queryString}`,
      MerchantsResponseSchema
    );
  },

  async getMerchantById(id: number): Promise<Merchant> {
    return apiClient.get<Merchant>(`/merchants/${id}`, MerchantSchema);
  },

  async createMerchant(
    data: CreateMerchant
  ): Promise<{ message: string; data: Merchant }> {
    const validatedData = CreateMerchantSchema.parse(data);

    return apiClient.post<{ message: string; data: Merchant }>(
      "/merchants",
      validatedData
    );
  },

  async updateMerchant(
    id: number,
    data: UpdateMerchant
  ): Promise<{ message: string; data: Merchant }> {
    const validatedData = UpdateMerchantSchema.parse(data);

    return apiClient.patch<{ message: string; data: Merchant }>(
      `/merchants/${id}`,
      validatedData
    );
  },

  async updateMerchantStatus(
    id: number,
    data: UpdateMerchantStatus
  ): Promise<{ message: string; data: Merchant }> {
    const validatedData = UpdateMerchantStatusSchema.parse(data);

    return apiClient.patch<{ message: string; data: Merchant }>(
      `/merchants/${id}/status`,
      validatedData
    );
  },

  async deleteMerchant(
    id: number
  ): Promise<{ message: string; data: Merchant }> {
    return apiClient.delete<{ message: string; data: Merchant }>(
      `/merchants/${id}`
    );
  },

  async getDepartmentsAndCities(): Promise<DepartmentsCitiesResponse> {
    return apiClient.get<DepartmentsCitiesResponse>(
      "/merchants/departments-cities",
      DepartmentsCitiesResponseSchema
    );
  },

  async exportMerchants(): Promise<Blob> {
    try {
      const response = await axiosInstance.request({
        url: "/merchants/export",
        method: "GET",
        responseType: "blob",
        headers: {
          Accept: "text/csv",
          "Content-Type": "application/json",
        },
      });

      if (!(response.data instanceof Blob)) {
        throw new Error("La respuesta no es un archivo válido");
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          throw new Error(
            "No tienes permisos para exportar datos. Contacta al administrador."
          );
        }
        if (error.response?.status === 401) {
          throw new Error(
            "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
          );
        }
        const errorMessage =
          error.response?.data?.message || "Error al generar el reporte CSV";
        throw new Error(errorMessage);
      }
      throw new Error("Error de conexión al servidor");
    }
  },

  async getMerchantTotals(id: number): Promise<MerchantTotals> {
    return apiClient.get<MerchantTotals>(
      `/merchants/${id}/totals`,
      MerchantTotalsSchema
    );
  },
};

export type {
  MerchantsResponse,
  MerchantsQueryParams,
  CreateMerchant,
  UpdateMerchant,
  UpdateMerchantStatus,
  Merchant,
  MerchantTotals,
} from "../schemas/merchant.schemas";
