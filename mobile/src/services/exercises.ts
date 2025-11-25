import { api } from "@/config/api";

export const getGroups = async () => await api.get("/groups");

export const getExercisesByGroup = async (groupName: string) =>
  await api.get(`/exercises/bygroup/${groupName}`);

export const getExerciseDetails = async (id: number) =>
  await api.get(`/exercises/${id}`);
