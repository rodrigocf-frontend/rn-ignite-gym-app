import { Box } from "@/components/base/box";
import { Card } from "@/components/base/card";
import { Heading } from "@/components/base/heading";
import { HStack } from "@/components/base/hstack";
import { Text } from "@/components/base/text";
import { VStack } from "@/components/base/vstack";

export type History = {
  id: number;
  user_id: number;
  exercise_id: number;
  name: string;
  group: string;
  created_at: string;
  hour: string;
};

type Props = {
  data: History;
};

export function HistoryCard({ data }: Props) {
  const { name, group, hour } = data;

  return (
    <Card variant="filled" className="p-4 bg-primary-300 ">
      <HStack className="justify-between items-center">
        <VStack>
          <Heading
            size="sm"
            className="mb-1 font-roboto text-typography-white capitalize"
          >
            {group}
          </Heading>
          <Text size="lg" className="mb-1  font-roboto  text-typography-white">
            {name}
          </Text>
        </VStack>
        <Box className="mr-1">
          <Text size="sm" className="mb-1  font-roboto text-typography-150">
            {hour}
          </Text>
        </Box>
      </HStack>
    </Card>
  );
}
