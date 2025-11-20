import { api } from "@/config/axios-instance";

type UpdateUserDTO = {
  name: string;
  password?: string;
  old_password?: string;
};

export const updateUserData = async (putData: UpdateUserDTO) => {
  try {
    return await api.put(`/users`, putData);
  } catch (e) {
    throw e;
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

type UpdateAvatarDTO = {
  avatar: string;
};

export const updateUserAvatar = async (data: FormData) => {
  try {
    return await api.patch<UpdateAvatarDTO>(`/users/avatar`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    console.log(e);
    throw Error("Failed to update user avatar.");
  }
};
