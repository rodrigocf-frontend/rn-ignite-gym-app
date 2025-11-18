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
import { api, setUnauthorizedHandler } from "@/config/axios-instance";
import { use, useEffect, useState } from "react";
import { AuthContext } from "@/store/AuthContext";
import { Alert } from "react-native";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/base/toast";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText } from "@/components/base/button";

export function Login() {
  const toast = useToast();
  const [toastId, setToastId] = useState(0);

  const navigation = useNavigation();
  const { login } = use(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleToast = () => {
    if (!toast.isActive(toastId.toString())) {
      showNewToast();
    }
  };

  const showNewToast = () => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      placement: "top",
      id: newId.toString(),
      duration: 10000,
      render: ({}) => {
        const uniqueToastId = "toast-" + newId;

        return (
          <Toast
            className="bg-red-600 z-50"
            nativeID={uniqueToastId}
            action="muted"
            variant="solid"
          >
            <ToastTitle>Hello!</ToastTitle>
            <ToastDescription>
              This is a customized toast message.
            </ToastDescription>
          </Toast>
        );
      },
    });
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { data: userData } = await api.post("/sessions", data);

      if (userData.user) {
        login(userData.user);
        navigation.navigate("authenticated", {
          screen: "home",
        });
      }
    } catch (error) {
      // Mostrar toast de erro
      handleToast();
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
              onPress={handleSubmit(onSubmit)}
              isDisabled={isSubmitting}
            >
              {isSubmitting ? "Acessando..." : "Acessar"}
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
