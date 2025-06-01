import axios, { AxiosInstance, AxiosResponse } from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

console.log(API_BASE_URL);

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        const currentPath = window.location.pathname;
        const publicPages = ["/login", "/unauthorized", "/register"];
        if (!publicPages.includes(currentPath)) {
          window.location.href = "/unauthorized";
        }
      }
    }

    if (error.response?.status === 403) {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        if (currentPath !== "/unauthorized") {
          window.location.href = "/unauthorized";
        }
      }
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
