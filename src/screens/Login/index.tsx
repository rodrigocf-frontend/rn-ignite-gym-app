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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormData, loginSchema } from "@/schemas/loginschema";
import { use } from "react";
import { AuthContext } from "@/store/AuthContext";

import { SafeAreaView } from "react-native-safe-area-context";
import { authenticate } from "@/services/auth";
import { ToastContext } from "@/store/ToastContext";

export function Login() {
  const navigation = useNavigation();
  const { login } = use(AuthContext);
  const { handleToast } = use(ToastContext);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "mec@email.com",
      password: "1234567",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { data: userData } = await authenticate(data);
      if (userData.user) {
        login(userData.user);
        handleToast({
          title: "Authentication",
          msg: `Bem vindo, ${userData.user.name} `,
          sucess: true,
        });
      }
    } catch (e) {
      handleToast({
        title: "Authentication",
        msg: "Falha na autenticação.",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={bgImg}
        resizeMode="none"
        className="absolute w-full h-[624px]"
      />
      <Box className="px-10 flex-1">
        <Center className="mt-32 mb-48">
          <Box>
            <Brand />
          </Box>
        </Center>
        <Box className="gap-[18px] flex-1">
          <Center>
            <Heading className="text-typography-50">Acesse sua conta</Heading>
          </Center>
          <VStack space="md">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  placeholder="E-mail"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  placeholder="Senha"
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                />
              )}
            />
          </VStack>
          <Box className="mt-8 justify-between flex-1 pb-20">
            <AppButton
              isLoading={isSubmitting}
              onPress={handleSubmit(onSubmit)}
              isDisabled={isSubmitting}
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
                  variant="outline"
                >
                  Criar conta
                </AppButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
