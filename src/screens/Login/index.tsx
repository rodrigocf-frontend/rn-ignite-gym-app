import { ImageBackground } from "@/components/base/image-background";
import bgImg from "../../../assets/background.png";
import { Brand } from "@/components/common/brand";
import { Box } from "@/components/base/box";
import { Center } from "@/components/base/center";
import { Text } from "@/components/base/text";
import { AppButton } from "@/components/common/appbutton";
import { VStack } from "@/components/base/vstack";
import { TextField } from "@/components/common/textfield";
import { Heading } from "@/components/base/heading";
import { useNavigation } from "@react-navigation/native";

export function Login() {
  const navigation = useNavigation();

  return (
    <Box className="flex-1">
      <ImageBackground
        source={bgImg}
        resizeMode="none"
        className="absolute w-full h-[624px]"
      />
      <Box className="px-10 flex-1">
        <Center className="mt-32  mb-48">
          <Box>
            <Brand />
          </Box>
        </Center>
        <Box className="gap-[18px] flex-1">
          <Center>
            <Heading className="text-typography-50">Acesse sua conta</Heading>
          </Center>
          <VStack space="md">
            <TextField label="Email" />
            <TextField label="Password" type="password" />
          </VStack>
          <Box className="mt-8 justify-between flex-1 pb-20">
            <AppButton
              onPress={() =>
                navigation.navigate("authenticated", { screen: "home" })
              }
            >
              Acessar
            </AppButton>
            <Box>
              <Center>
                <Text className="text-typography-50 text-base font-roboto">
                  Ainda não tem acesso?
                </Text>
              </Center>
              <Box className="mt-3">
                <AppButton
                  onPress={() =>
                    navigation.navigate("public", {
                      screen: "signup",
                    })
                  }
                  variant="secondary"
                >
                  Criar conta
                </AppButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
