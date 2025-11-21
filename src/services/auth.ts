import { api } from "@/config/api";
import { LoginFormData } from "@/schemas/loginschema";
import {
  clearStorageTokens,
  getStorageRefreshToken,
  setStorageRefreshToken,
  setStorageToken,
} from "@/storage/tokens";
import { clearStorageUser, setStorageUser } from "@/storage/user";

export const authenticate = async (formData: LoginFormData) => {
  try {
    const response = await api.post("/sessions", formData);
    if (response.data) {
      await setStorageToken(response.data.token);
      await setStorageRefreshToken(response.data.refresh_token);
      await setStorageUser({
        email: response.data.user.email,
        name: response.data.user.name,
        id: response.data.user.id,
        avatar: response.data.user.avatar,
      });

      api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      return response;
    }
    return response;
  } catch (e) {
    throw e;
  }
};

export const refreshAuthenticate = async () => {
  try {
    const sessionToken = await getStorageRefreshToken();
    if (sessionToken) {
      const response = await api.post("/sessions/refresh-token", {
        refresh_token: sessionToken,
      });

      await setStorageToken(response.data.token);
      return response.data.token;
    }
    return;
  } catch (e) {
    throw e;
  }
};

export const clearAuthenticate = async () => {
  await clearStorageTokens();
  await clearStorageUser();
};
