import { History } from "@/components/ui/cards/historycard";
import { api } from "@/config/axios-instance";

export type HistoryDTO = {
  title: string;
  data: History[];
};

export const getHistory = async () => {
  try {
    return await api.get<HistoryDTO[]>(`/history`);
  } catch {
    throw Error("Failed to fetch user histories.");
  }
};

type CreateHistoryDTO = {
  exercise_id: number;
};

export const createHistory = async (data: CreateHistoryDTO) => {
  try {
    return await api.post(`/history`, data);
  } catch {
    throw Error("Failed to create user history.");
  }
};
