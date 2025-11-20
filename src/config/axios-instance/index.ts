import { ToastActionParams } from "@/store/ToastContext";
import axios, { AxiosError } from "axios";

let errorHandler: ((params: ToastActionParams) => void) | null = null;

export const setErrorHandler = (
  callback: (params: ToastActionParams) => void
) => {
  errorHandler = callback;
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
    errorHandler?.({
      title: error.name,
      msg: error.message,
    });
    return Promise.reject(error);
  }
);
