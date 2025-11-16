import { Heading } from "@/components/base/heading";
import { Icon } from "@/components/base/icon";
import { Image } from "@/components/base/image";
import { Text } from "@/components/base/text";
import { VStack } from "@/components/base/vstack";

import { Exercise } from "@/screens/home";
import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = {
  onPress?: () => void;
  data: Exercise;
} & TouchableOpacityProps;

export function ExerciseCard({ onPress, data }: Props) {
  return (
    <TouchableOpacity
      className="bg-primary-250 rounded-xl mb-3 overflow-hidden flex-row items-center p-2"
      onPress={onPress}
    >
      {/* Imagem */}
      <Image
        source={{ uri: data.image }}
        className="w-16 h-16 rounded-lg mr-4"
        resizeMode="cover"
      />

      {/* Conteúdo */}
      <VStack className="flex-1">
        <Heading size="lg" className="text-typography-white font-roboto mb-1">
          {data.name}
        </Heading>
        <Text size="sm" className="text-typography-100 font-roboto">
          {data.series} séries x {data.reps} repetições
        </Text>
      </VStack>

      {/* Ícone de seta */}
      <Icon as={ChevronRight} className="text-primary-150 w-8 h-8 mr-2" />
    </TouchableOpacity>
  );
}
