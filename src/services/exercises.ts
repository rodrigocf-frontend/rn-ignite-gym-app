import { api } from "@/config/axios-instance";

export const getGroups = async () => {
  try {
    return await api.get("/groups");
  } catch {
    throw Error("Failed to fetch groups.");
  }
};

export const getExercisesByGroup = async (groupName: string) => {
  try {
    return await api.get(`/exercises/bygroup/${groupName}`);
  } catch {
    throw Error("Failed to fetch exercises by groupName.");
  }
};

export const getExerciseDetails = async (id: number) => {
  try {
    return await api.get(`/exercises/${id}`);
  } catch {
    throw Error("Failed to fetch exercise details.");
  }
};
