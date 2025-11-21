import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (token: string) =>
  AsyncStorage.setItem("@ignitegym:token", token);

export const setRefreshToken = async (refreshToken: string) =>
  AsyncStorage.setItem("@ignitegym:refreshtoken", refreshToken);

export const getToken = async () => AsyncStorage.getItem("@ignitegym:token");

export const getRefreshToken = async () =>
  AsyncStorage.getItem("@ignitegym:refreshtoken");
