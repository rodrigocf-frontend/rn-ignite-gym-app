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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormData, signUpSchema } from "@/schemas/signupschema";
import { ImageBackground } from "@/components/base/image-background";

export function SignUp() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log("Dados do formulário:", data);
      // Aqui você faria a chamada à API
      // await createAccount(data);

      // Navegar para tela autenticada
      // navigation.navigate("authenticated");
    } catch (error) {
      console.error("Erro ao criar conta:", error);
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
        <Center className="mt-32 mb-32">
          <Box>
            <Brand />
          </Box>
        </Center>
        <Box className="gap-[18px] flex-1">
          <Center>
            <Heading className="text-typography-50">Crie sua conta</Heading>
          </Center>
          <VStack space="md">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  placeholder="Nome"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />

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

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  placeholder="Confirme a senha"
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  isInvalid={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
          </VStack>
          <Box className="mt-8 justify-between flex-1 pb-10">
            <AppButton onPress={handleSubmit(onSubmit)}>
              {isSubmitting ? "Criando..." : "Criar e acessar"}
            </AppButton>

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
