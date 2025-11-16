import { Box } from "@/components/base/box";
import { Card } from "@/components/base/card";
import { Heading } from "@/components/base/heading";
import { HStack } from "@/components/base/hstack";
import { Text } from "@/components/base/text";
import { VStack } from "@/components/base/vstack";

export function HistoryCard() {
  return (
    <Card variant="filled" className="p-4 bg-primary-300 ">
      <HStack className="justify-between items-center">
        <VStack>
          <Heading size="sm" className="mb-1 font-roboto text-typography-white">
            Costas
          </Heading>
          <Text size="lg" className="mb-1  font-roboto  text-typography-white">
            Puxada frontal
          </Text>
        </VStack>
        <Box className="mr-1">
          <Text size="sm" className="mb-1  font-roboto text-typography-150">
            08:56
          </Text>
        </Box>
      </HStack>
    </Card>
  );
}
