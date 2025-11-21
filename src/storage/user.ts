import { User } from "@/store/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

enum UserKeys {
  USER = "@ignitegym:user",
}

export const setStorageUser = async (data: User | Partial<User>) =>
  AsyncStorage.setItem(UserKeys.USER, JSON.stringify(data));

export const getStorageUser = async (): Promise<User | undefined> => {
  try {
    const user = await AsyncStorage.getItem(UserKeys.USER);
    if (!user) {
      return;
    }
    return JSON.parse(user);
  } catch (e) {
    throw e;
  }
};

export const clearStorageUser = async () =>
  await AsyncStorage.removeItem(UserKeys.USER);
