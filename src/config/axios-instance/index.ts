import axios from "axios";

let UnauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (callback: () => void) => {
  UnauthorizedHandler = callback;
};

export const api = axios.create({
  baseURL: "http://192.168.0.4:3333",
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    UnauthorizedHandler?.();
    return Promise.reject(error);
  }
);
