import { getStorageRefreshToken } from "@/storage/tokens";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

let logoutHandler: () => void = () => {};

export const setLogoutHandler = (callback: () => void) => {
  logoutHandler = callback;
};

export const api = axios.create({
  baseURL: "http://192.168.0.4:3333",
});

type AppInternalAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry: boolean;
};

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: unknown | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error instanceof AxiosError) {
      const originalConfig = error.config as AppInternalAxiosRequestConfig;

      if (error.response?.status === 401 && !originalConfig._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return api(originalConfig);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;
        originalConfig._retry = true;

        try {
          const refreshToken = await getStorageRefreshToken();
          const { data } = await api.post("/sessions/refresh-token", {
            refresh_token: refreshToken,
          });

          const token = data.token;
          if (!token) {
            return logoutHandler();
          }
          originalConfig.headers.Authorization = `Bearer ${token}`;
          processQueue(null, refreshToken);

          return api(originalConfig);
        } catch (e) {
          processQueue(e, "");
        } finally {
          isRefreshing = false;
        }
      } else if (
        error.response?.status === 404 &&
        error.response.data.status === "error"
      ) {
      }
    }
  }
);
