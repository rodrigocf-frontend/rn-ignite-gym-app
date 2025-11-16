import { Box } from "@/components/base/box";
import { Image } from "@/components/base/image";
import exerciseImage from "../../../assets/exercise.png";
import { VStack } from "@/components/base/vstack";
import { BarbellIcon, RepeatIcon } from "phosphor-react-native";
import { AppButton } from "@/components/common/appbutton";
import { HStack } from "@/components/base/hstack";
import { Text } from "@/components/base/text";
import { Icon } from "@/components/base/icon";

export function Exercise() {
  return (
    <Box className=" flex-1 ">
      <VStack className="flex-1 p-8">
        <HStack className="flex-1">
          <Image
            size="full"
            source={{
              uri: exerciseImage,
            }}
            alt="image"
          />
        </HStack>

        <Box className="mb-32 bg-primary-300 mt-3 rounded-lg p-4">
          <VStack>
            <Box className="mb-6 mt-1">
              <HStack className="justify-between px-7">
                <HStack space="sm" className="items-center">
                  <Icon fill="#00875F" as={BarbellIcon} size={"xl"} />
                  <Text className="font-roboto text-typography-100 text-xl">
                    3 séries
                  </Text>
                </HStack>
                <HStack space="sm" className="items-center">
                  <Icon fill="#00875F" as={RepeatIcon} size={"xl"} />
                  <Text className="font-roboto text-typography-100 text-xl">
                    12 repetições
                  </Text>
                </HStack>
              </HStack>
            </Box>
            <AppButton variant="solid">Marcar como realizado</AppButton>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
