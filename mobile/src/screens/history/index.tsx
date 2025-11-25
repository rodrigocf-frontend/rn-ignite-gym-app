import { Box } from "@/components/base/box";
import { Heading } from "@/components/base/heading";
import { HistoryCard } from "@/components/ui/cards/historycard";
import { HistoryDTO, getHistory } from "@/services/histories";
import { ToastContext } from "@/store/ToastContext";
import { useFocusEffect } from "@react-navigation/native";
import { use, useCallback, useEffect, useState } from "react";
import { SectionList } from "react-native";

export function History() {
  const [histories, setHistories] = useState<HistoryDTO[]>([]);
  const { handleToast } = use(ToastContext);

  const fetchHistories = async () => {
    try {
      const { data } = await getHistory();
      setHistories(data);
    } catch {
      handleToast({
        title: "Histórico",
        msg: "Falha ao buscar histórico.",
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistories();
    }, [])
  );

  return (
    <Box className="flex-1 p-8">
      <SectionList
        sections={histories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Box className="mb-3">
            <HistoryCard data={item} />
          </Box>
        )}
        renderSectionHeader={({ section }) => (
          <Box className="mb-3 mt-10">
            <Heading size="sm" className="font-roboto text-typography-100">
              {section.title}
            </Heading>
          </Box>
        )}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
