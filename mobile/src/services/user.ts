import { api } from "@/config/api";

type UpdateUserDTO = {
  name: string;
  password?: string;
  old_password?: string;
};

export const updateUserData = async (putData: UpdateUserDTO) =>
  await api.put(`/users`, putData);

type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export const createUser = async (putData: CreateUserDTO) =>
  await api.post(`/users`, putData);

type UpdateAvatarDTO = {
  avatar: string;
};

export const updateUserAvatar = async (data: FormData) =>
  await api.patch<UpdateAvatarDTO>(`/users/avatar`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
