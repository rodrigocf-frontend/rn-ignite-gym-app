import { api } from "@/config/api";
import { LoginFormData } from "@/schemas/loginschema";
import { getRefreshToken, setRefreshToken, setToken } from "@/storage/session";

export const authenticate = async (formData: LoginFormData) => {
  try {
    const response = await api.post("/sessions", formData);
    if (response.data) {
      await setToken(response.data.token);
      await setRefreshToken(response.data.refresh_token);
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
    const sessionToken = await getRefreshToken();
    const { data } = await api.post("/sessions/refresh-token", {
      refresh_token: sessionToken,
    });
    setToken(data.token);
    return data.token;
  } catch (e) {
    throw e;
  }
};
