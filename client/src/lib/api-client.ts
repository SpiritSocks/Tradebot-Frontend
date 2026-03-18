import createClient from "openapi-fetch";
import type { paths } from "./api"; //  сгенерирован openapi
import { useQuery, useMutation } from "@tanstack/react-query";

// Все Фолбэки на мок данные будут заменяться на то, что нужно

// Будет прочитан из .env файла
export const apiClient = createClient<paths>({ baseUrl: "https://api.tradebot.local" });

export function useExchanges() {
  return useQuery({
    queryKey: ["exchanges"],
    queryFn: async () => {
      try {
        const { data, error } = await apiClient.GET("/market/exchanges");
        if (error) throw new Error(error.message || "Failed to fetch exchanges");
        return data;
      } catch (err) {
        // Фолбэк мок данные
        return {
          exchanges: [
            { code: "bybit", categories: ["linear", "spot", "inverse"], intervals: ["1", "5", "15", "60", "D"], price_types: ["0", "1", "2", "3"] },
            { code: "binance", categories: ["linear", "spot"], intervals: ["1", "5", "15", "60", "D"], price_types: ["0", "1", "2", "3"] },
            { code: "okx", categories: ["linear", "spot"], intervals: ["1", "5", "15", "60", "D"], price_types: ["0", "1", "2", "3"] }
          ]
        };
      }
    }
  });
}

export function useSymbols(exchange: string, category: string) {
  return useQuery({
    queryKey: ["symbols", exchange, category],
    queryFn: async () => {
      try {
        const { data, error } = await apiClient.GET("/market/symbols", {
          params: { query: { exchange, category } }
        });
        if (error) throw new Error(error.message || "Failed to fetch symbols");
        return data;
      } catch (err) {
        // Фолбэк мок данные
        return {
          symbols: ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "DOGEUSDT"]
        };
      }
    },
    enabled: !!exchange && !!category
  });
}

export function useDetectors() {
  return useQuery({
    queryKey: ["detectors"],
    queryFn: async () => {
      try {
        const { data, error } = await apiClient.GET("/detectors");
        if (error) throw new Error(error.message || "Failed to fetch detectors");
        return data;
      } catch (err) {
        // Фолбэк мок данные
        return {
          detectors: [
            { code: "MA_CROSS", description: "Moving Average Cross", kind: "indicator", opts_schema: { short_period: { type: "number" }, long_period: { type: "number" } } },
            { code: "RSI", description: "RSI Divergence", kind: "indicator", opts_schema: { period: { type: "number" }, overbought: { type: "number" }, oversold: { type: "number" } } },
            { code: "BOLLINGER", description: "Bollinger Bands Breakout", kind: "indicator", opts_schema: { period: { type: "number" }, std_dev: { type: "number" } } },
            { code: "CUSTOM_W", description: "Custom Window (W)", kind: "custom", opts_schema: { window_size: { type: "number" } } }
          ]
        };
      }
    }
  });
}

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

export function useGenerateInvite() {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await apiClient.POST("/auth/admin/invite-token");
      if (error) throw new Error(error.message || "Failed to generate invite");
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
