import { Box } from "@/components/base/box";
import { Heading } from "@/components/base/heading";
import { HistoryCard } from "@/components/ui/cards/historycard";
import { SectionList } from "react-native";

const sections = [
  {
    data: ["asdsad"],
  },
  {
    data: ["asdsad"],
  },
  {
    data: ["asdsad", "as233dsad", "asds321ad", "asdsad23", "asd534sad"],
  },
];

export function History() {
  return (
    <Box className="flex-1 p-8">
      <SectionList
        sections={sections}
        keyExtractor={(item) => item}
        renderItem={() => (
          <Box className="mb-3">
            <HistoryCard />
          </Box>
        )}
        renderSectionHeader={() => (
          <Box className="mb-3 mt-10">
            <Heading size="sm" className="font-roboto text-typography-100">
              26.08.2022
            </Heading>
          </Box>
        )}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
