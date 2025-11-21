import AsyncStorage from "@react-native-async-storage/async-storage";

enum TokenKeys {
  TOKEN = "@ignitegym:token",
  REFRESH_TOKEN = "@ignitegym:refreshtoken",
}

export const setStorageToken = async (token: string) =>
  await AsyncStorage.setItem(TokenKeys.TOKEN, token);

export const setStorageRefreshToken = async (refreshToken: string) =>
  await AsyncStorage.setItem(TokenKeys.REFRESH_TOKEN, refreshToken);

export const getStorageToken = async () =>
  await AsyncStorage.getItem(TokenKeys.TOKEN);

export const getStorageRefreshToken = async () =>
  await AsyncStorage.getItem(TokenKeys.REFRESH_TOKEN);

export const clearStorageTokens = async () => {
  await AsyncStorage.multiRemove([TokenKeys.REFRESH_TOKEN, TokenKeys.TOKEN]);
};
