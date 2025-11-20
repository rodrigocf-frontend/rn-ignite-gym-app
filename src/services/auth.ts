import { api } from "@/config/axios-instance";
import { LoginFormData } from "@/schemas/loginschema";

export const authenticate = async (formData: LoginFormData) => {
  try {
    return await api.post("/sessions", formData);
  } catch {
    throw Error("Failed to authenticate.");
  }
};
