import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./api";
import { useQuery, useMutation } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = createClient<paths>({ baseUrl: API_BASE_URL });

// Middleware: подставляет Bearer token из localStorage в каждый запрос
const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const token = localStorage.getItem("access_token");
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  },
};

apiClient.use(authMiddleware);

// ── Auth ──

export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"]) => {
      const { data, error } = await apiClient.POST("/auth/login", {
        body: credentials
      });
      if (error) throw new Error(error.message || "Login failed");
      return data;
    }
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (credentials: paths["/auth/register"]["post"]["requestBody"]["content"]["application/json"]) => {
      const { data, error } = await apiClient.POST("/auth/register", {
        body: credentials
      });
      if (error) throw new Error(error.message || "Registration failed");
      return data;
    }
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: async (body: paths["/auth/refresh"]["post"]["requestBody"]["content"]["application/json"]) => {
      const { data, error } = await apiClient.POST("/auth/refresh", {
        body
      });
      if (error) throw new Error(error.message || "Token refresh failed");
      return data;
    }
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (body: paths["/auth/password/change"]["post"]["requestBody"]["content"]["application/json"]) => {
      const { data, error } = await apiClient.POST("/auth/password/change", {
        body
      });
      if (error) throw new Error(error.message || "Failed to change password");
      return data;
    }
  });
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: async (body: paths["/auth/password/reset/request"]["post"]["requestBody"]["content"]["application/json"]) => {
      const { data, error } = await apiClient.POST("/auth/password/reset/request", {
        body
      });
      if (error) throw new Error(error.message || "Failed to request password reset");
      return data;
    }
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (body: paths["/auth/password/reset"]["post"]["requestBody"]["content"]["application/json"]) => {
      const { data, error } = await apiClient.POST("/auth/password/reset", {
        body
      });
      if (error) throw new Error(error.message || "Failed to reset password");
      return data;
    }
  });
}

export function useGenerateInvite() {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await apiClient.POST("/auth/admin/invite-token");
      if (error) throw new Error(error.message || "Failed to generate invite");
      return data;
    }
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: async (token: string) => {
      const { error } = await apiClient.GET("/auth/verify", {
        params: { query: { token } }
      });
      if (error) throw new Error(error.message || "Email verification failed");
    }
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const { error } = await apiClient.POST("/auth/logout");
      if (error) throw new Error(error.message || "Logout failed");
    }
  });
}

export function useLogoutAll() {
  return useMutation({
    mutationFn: async () => {
      const { error } = await apiClient.POST("/auth/logout-all");
      if (error) throw new Error(error.message || "Logout all failed");
    }
  });
}

// ── Market ──

export function useExchanges() {
  return useQuery({
    queryKey: ["exchanges"],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/market/exchanges");
      if (error) throw new Error(error.message || "Failed to fetch exchanges");
      return data;
    }
  });
}

export function useSymbols(exchange: string, category: string) {
  return useQuery({
    queryKey: ["symbols", exchange, category],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/market/symbols", {
        params: { query: { exchange, category } }
      });
      if (error) throw new Error(error.message || "Failed to fetch symbols");
      return data;
    },
    enabled: !!exchange && !!category
  });
}

// ── Detectors ──

export function useDetectors() {
  return useQuery({
    queryKey: ["detectors"],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/detectors");
      if (error) throw new Error(error.message || "Failed to fetch detectors");
      return data;
    }
  });
}

// ── Runs ──

export function useListRuns(params?: { limit?: number; before_id?: number }) {
  return useQuery({
    queryKey: ["runs", params?.limit, params?.before_id],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/runs", {
        params: { query: params }
      });
      if (error) throw new Error(error.message || "Failed to fetch runs");
      return data;
    }
  });
}

export function useStartRun() {
  return useMutation({
    mutationFn: async (body: paths["/runs"]["post"]["requestBody"]["content"]["application/json"]) => {
      const { data, error } = await apiClient.POST("/runs", {
        body
      });
      if (error) throw new Error(error.message || "Failed to start run");
      return data;
    }
  });
}

export function useRunStatus(runId: string) {
  return useQuery({
    queryKey: ["run-status", runId],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/runs/{run_id}/status", {
        params: { path: { run_id: runId } }
      });
      if (error) throw new Error(error.message || "Failed to fetch run status");
      return data;
    },
    enabled: !!runId,
    refetchInterval: 3000,
  });
}

export function useRunMeta(runId: string) {
  return useQuery({
    queryKey: ["run-meta", runId],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/runs/{run_id}/meta", {
        params: { path: { run_id: runId } }
      });
      if (error) throw new Error(error.message || "Failed to fetch run meta");
      return data;
    },
    enabled: !!runId,
  });
}

export async function downloadRunResult(runId: string) {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_BASE_URL}/runs/${encodeURIComponent(runId)}/result`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Failed to download run result");
  return res.blob();
}
