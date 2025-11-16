import { ImageBackground } from "@/components/base/image-background";
import { SafeAreaView } from "react-native-safe-area-context";
import bgImg from "../../../assets/background.png";
import { Brand } from "@/components/common/brand";
import { Box } from "@/components/base/box";
import { Center } from "@/components/base/center";
import { AppButton } from "@/components/common/appbutton";
import { VStack } from "@/components/base/vstack";
import { TextField } from "@/components/common/textfield";
import { Heading } from "@/components/base/heading";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={bgImg}
        resizeMode="none"
        className="absolute w-full h-[624px]"
      />
      <Box className="px-10 flex-1">
        <Center className="mt-32  mb-32">
          <Box>
            <Brand />
          </Box>
        </Center>
        <Box className="gap-[18px] flex-1">
          <Center>
            <Heading className="text-typography-50">Acesse sua conta</Heading>
          </Center>
          <VStack space="md">
            <TextField placeholder="Nome" />
            <TextField placeholder="Email" />
            <TextField placeholder="Senha" type="password" />
            <TextField placeholder="Confirme a senha" type="password" />
          </VStack>
          <Box className="mt-8 justify-between flex-1 pb-10">
            <AppButton>Criar e acessar</AppButton>

            <Box className="mt-3">
              <AppButton variant="outline" onPress={() => navigation.goBack()}>
                Voltar para o login
              </AppButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
