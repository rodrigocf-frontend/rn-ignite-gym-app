import React, { useState } from "react";
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

export function Profile() {
  const [name, setName] = useState("Rodrigo Gonçalves");
  const [email, setEmail] = useState("rodrigo@email.com");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateProfile = () => {
    console.log("Atualizar perfil");
  };

  const handleChangePhoto = () => {
    console.log("Alterar foto");
  };

  return (
    <Box className="flex-1 px-10">
      <VStack className="flex-1 pt-8">
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

        <VStack space="md" className="mb-8">
          <TextField color="SECONDARY" placeholder="Nome" />
          <TextField color="SECONDARY" placeholder="E-mail" />
        </VStack>

        <VStack space="md" className="mb-9">
          <Box className="">
            <Heading className="text-typography-100 text-base font-bold">
              Alterar senha
            </Heading>
          </Box>

          <TextField
            color="SECONDARY"
            placeholder="Senha antiga"
            type="password"
          />

          <TextField
            color="SECONDARY"
            placeholder="Nova senha"
            type="password"
          />
        </VStack>

        <AppButton onPress={handleChangePhoto}>Atualizar</AppButton>
      </VStack>
    </Box>
  );
}
