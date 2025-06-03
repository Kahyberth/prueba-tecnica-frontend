"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import {
  AuthState,
  AuthContextType,
  User,
  LoginCredentials,
  LoginResponse,
} from "../types/auth";
import { apiClient, authApi } from "../utils/auth";

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_AUTHENTICATED"; payload: boolean }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload !== null,
        isLoading: false,
        error: null,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "SET_AUTHENTICATED":
      return { ...state, isAuthenticated: action.payload };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  const clearError = useCallback(() => {
    dispatch({ type: "SET_ERROR", payload: null });
  }, []);

  const checkAuth = useCallback(async (): Promise<void> => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        dispatch({ type: "SET_USER", payload: user });
        return;
      }

      await apiClient.get("/auth/verify-session");
      dispatch({ type: "SET_AUTHENTICATED", payload: true });
    } catch (error) {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<void> => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        clearError();

        const response = await authApi.login(credentials);
        localStorage.setItem("user", JSON.stringify(response.user));
        dispatch({ type: "SET_USER", payload: response.user });

        router.push("/dashboard");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Login failed";
        dispatch({ type: "SET_ERROR", payload: errorMessage });
        throw error;
      }
    },
    [clearError, router]
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    checkAuth,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
