import axios from "axios";
import { z } from "zod";
import { axiosInstance } from "./axios.config";
import {
  LoginRequestSchema,
  LoginResponseSchema,
  UserSchema,
  type LoginRequest,
  type LoginResponse,
  type User,
} from "../schemas/auth.schemas";

export const apiClient = {
  async request<T>(
    url: string,
    options: {
      method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
      data?: unknown;
      schema?: z.ZodSchema<T>;
    } = {}
  ): Promise<T> {
    try {
      const { method = "GET", data, schema } = options;

      const response = await axiosInstance.request({
        url,
        method,
        data,
      });

      if (schema) {
        const validatedData = schema.parse(response.data);
        return validatedData;
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
      }
      throw error;
    }
  },

  async get<T>(url: string, schema?: z.ZodSchema<T>): Promise<T> {
    return this.request<T>(url, { method: "GET", schema });
  },

  async post<T>(
    url: string,
    data?: unknown,
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    return this.request<T>(url, { method: "POST", data, schema });
  },

  async put<T>(
    url: string,
    data?: unknown,
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    return this.request<T>(url, { method: "PUT", data, schema });
  },

  async patch<T>(
    url: string,
    data?: unknown,
    schema?: z.ZodSchema<T>
  ): Promise<T> {
    return this.request<T>(url, { method: "PATCH", data, schema });
  },

  async delete<T>(url: string, schema?: z.ZodSchema<T>): Promise<T> {
    return this.request<T>(url, { method: "DELETE", schema });
  },
};

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const validatedCredentials = LoginRequestSchema.parse(credentials);

    console.log("validatedCredentials", validatedCredentials);

    return apiClient.post<LoginResponse>(
      "/auth/login",
      validatedCredentials,
      LoginResponseSchema
    );
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
      }
    }
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>("/auth/me", UserSchema);
  },

  async refreshToken(): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>(
      "/auth/refresh",
      undefined,
      LoginResponseSchema
    );
  },
};

export const validateEmail = (email: string): boolean => {
  try {
    z.string().email().parse(email);
    return true;
  } catch {
    return false;
  }
};

export const validatePassword = (password: string): boolean => {
  try {
    z.string().min(6).parse(password);
    return true;
  } catch {
    return false;
  }
};

export const tokenUtils = {
  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  },

  setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
  },

  removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

export type {
  LoginRequest,
  LoginResponse,
  User,
} from "../schemas/auth.schemas";
export {
  LoginRequestSchema,
  LoginResponseSchema,
  UserSchema,
} from "../schemas/auth.schemas";
