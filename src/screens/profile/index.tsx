import React, { use, useState } from "react";
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
import { updateUserData } from "@/services/user";

export function Profile() {
  const { user, setUsername } = use(AuthContext);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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
        setUsername(data.name);
        reset({
          name: data.name,
        });
      }
    } catch {}
  };

  const handleChangePhoto = () => {
    console.log("Alterar foto");
  };

  return (
    <ScrollView className="flex-1 px-10" showsVerticalScrollIndicator={false}>
      <VStack className="flex-1 pt-8 pb-9">
        <Center className="pb-9 gap-3">
          <Avatar className="border-4 border-gray-800 w-48 h-48">
            <AvatarFallbackText>Rodrigo Gonçalves</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=880",
              }}
            />
          </Avatar>

          <AppButton variant="link" onPress={handleChangePhoto}>
            Alterar foto
          </AppButton>
        </Center>

        <VStack space="xl" className="mb-8">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                value={value}
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
            render={({ field: { onBlur, value } }) => (
              <TextField
                onBlur={onBlur}
                onChangeText={() => {}}
                value={value}
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    color="SECONDARY"
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
            isDisabled={isSubmitting}
          >
            {isSubmitting ? "Atualizando..." : "Atualizar"}
          </AppButton>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
