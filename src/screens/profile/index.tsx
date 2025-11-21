import React, { use } from "react";
import { Box } from "@/components/base/box";
import { VStack } from "@/components/base/vstack";
import { Heading } from "@/components/base/heading";
import {
  Avatar,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/base/avatar";
import { Center } from "@/components/base/center";
import { TextField } from "@/components/common/textfield";
import { AppButton } from "@/components/common/appbutton";
import { ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema, ProfileFormData } from "@/schemas/profileSchema";
import { AuthContext } from "@/store/AuthContext";
import { updateUserAvatar, updateUserData } from "@/services/user";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import { AxiosError } from "axios";
import { ToastContext } from "@/store/ToastContext";
import { api } from "@/config/api";

export function Profile() {
  const { user, updateUser } = use(AuthContext);
  const { handleToast } = use(ToastContext);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
    },
  });

  const handleUpdateProfile = async (data: ProfileFormData) => {
    try {
      const response = await updateUserData({
        name: data.name,
        old_password: data.oldPassword,
        password: data.newPassword,
      });

      if (response.status === 200) {
        updateUser({
          name: data.name,
        });
        reset({
          name: data.name,
          newPassword: "",
          oldPassword: "",
        });

        handleToast({
          title: "Dados",
          msg: `Usuário atualizado`,
          sucess: true,
        });

        return;
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        reset({
          oldPassword: " ",
        });

        handleToast({
          title: "Usuário",
          msg: "Falh ao atualizar dados do usuário",
          sucess: false,
        });
      }
    }
  };

  const handleChangePhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (result && result.assets) {
        const payload = {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name: result.assets[0].fileName,
        } as any;

        const formData = new FormData();
        formData.append("avatar", payload);

        const response = await updateUserAvatar(formData);

        if (response.status === 200) {
          await updateUser({
            avatar: response.data.avatar,
          });

          handleToast({
            title: "Avatar",
            msg: `Avatar atualizado`,
            sucess: true,
          });
        }
      }
    } catch {
      handleToast({
        title: "Usuário",
        msg: "Falh ao atualizar dados do usuário",
        sucess: false,
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        reset({
          name: user?.name,
          email: user?.email,
          newPassword: "",
          oldPassword: "",
        });
      };
    }, [])
  );

  return (
    <ScrollView className="flex-1 px-10" showsVerticalScrollIndicator={false}>
      <VStack className="flex-1 pt-8 pb-9">
        <Center className="pb-9 gap-3">
          <Avatar className="border-4 border-gray-800 w-48 h-48">
            <AvatarFallbackText size="xl">{user?.name}</AvatarFallbackText>

            {user?.avatar && (
              <AvatarImage
                source={{
                  uri: `${api.defaults.baseURL}/avatar/${user?.avatar}`,
                }}
                alt="user avatar"
              />
            )}
          </Avatar>

          <AppButton variant="link" onPress={handleChangePhoto}>
            Alterar foto
          </AppButton>
        </Center>

        <VStack space="xl" className="mb-8">
          <Controller
            control={control}
            name="name"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid },
            }) => (
              <TextField
                value={value}
                isInvalid={invalid}
                onChangeText={onChange}
                onBlur={onBlur}
                color="SECONDARY"
                placeholder="Nome"
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onBlur, value }, fieldState: { invalid } }) => (
              <TextField
                value={value}
                isInvalid={invalid}
                isDisabled
                color="SECONDARY"
                placeholder="E-mail"
                errorMessage={errors.email?.message}
              />
            )}
          />
        </VStack>

        <VStack space="2xl">
          <VStack space="sm" className="mb-9">
            <Box className="">
              <Heading className="text-typography-100 text-base font-bold">
                Alterar senha
              </Heading>
            </Box>

            <VStack space="xl">
              <Controller
                control={control}
                name="oldPassword"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { invalid },
                }) => (
                  <TextField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    isInvalid={invalid}
                    color="SECONDARY"
                    placeholder="Senha antiga"
                    type="password"
                    errorMessage={errors.oldPassword?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="newPassword"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { invalid },
                }) => (
                  <TextField
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    color="SECONDARY"
                    isInvalid={invalid}
                    placeholder="Nova senha"
                    type="password"
                    errorMessage={errors.newPassword?.message}
                  />
                )}
              />
            </VStack>
          </VStack>

          <AppButton
            onPress={handleSubmit(handleUpdateProfile)}
            isLoading={isSubmitting}
            isDisabled={isSubmitting ?? !isDirty}
          >
            Atualizar
          </AppButton>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
