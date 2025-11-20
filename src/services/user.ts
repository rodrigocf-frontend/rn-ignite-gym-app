import { api } from "@/config/axios-instance";

type UpdateUserDTO = {
  name: string;
  password?: string;
  old_password?: string;
};

export const updateUserData = async (putData: UpdateUserDTO) => {
  try {
    return await api.put(`/users`, putData);
  } catch {
    throw Error("Failed to update user data.");
  }
};

type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export const createUser = async (putData: CreateUserDTO) => {
  try {
    return await api.post(`/users`, putData);
  } catch {
    throw Error("Failed to create user.");
  }
};
