import { History } from "@/components/ui/cards/historycard";
import { api } from "@/config/api";

export type HistoryDTO = {
  title: string;
  data: History[];
};

export const getHistory = async () => await api.get<HistoryDTO[]>(`/history`);

type CreateHistoryDTO = {
  exercise_id: number;
};

export const createHistory = async (data: CreateHistoryDTO) =>
  await api.post(`/history`, data);
