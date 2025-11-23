import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/base/avatar";
import { Box } from "@/components/base/box";
import { Heading } from "@/components/base/heading";
import { HStack } from "@/components/base/hstack";
import { Pressable } from "@/components/base/pressable";
import { Text } from "@/components/base/text";
import { VStack } from "@/components/base/vstack";
import { ArrowLeft, ExitIcon, PersonIcon } from "@/components/common/icons";
import { api } from "@/config/api";
import { AuthContext } from "@/store/AuthContext";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { use } from "react";

interface OptionsBottomTabs {
  optionsBottomTabs?: BottomTabNavigationOptions;
}

type Props = {
  type: "home" | "exercise" | "title";
} & OptionsBottomTabs;

export function Header({ type, optionsBottomTabs }: Props) {
  return (
    <Box className="bg-primary-300 pt-16 px-9 pb-7 ">
      {type === "home" && <HomeHeader />}
      {type === "exercise" && <ExerciseHeader />}
      {type === "title" && (
        <TitleHeader optionsBottomTabs={optionsBottomTabs} />
      )}
    </Box>
  );
}

const HomeHeader = () => {
  const { user, logout } = use(AuthContext);

  const logoutHandler = () => {
    logout();
  };

  return (
    <HStack className="justify-between items-center">
      <HStack space="lg">
        <Avatar size="lg">
          <AvatarFallbackText>{user?.name}</AvatarFallbackText>
          {user?.avatar && (
            <AvatarImage
              className="border-2 border-primary-100"
              source={{
                uri: `${api.defaults.baseURL}/avatar/${user?.avatar}`,
              }}
            />
          )}
        </Avatar>
        <VStack className="justify-center">
          <Text className="text-typography-50 font-roboto text-base" size="sm">
            Olá,
          </Text>
          <Heading
            className="text-typography-50 font-roboto text-base"
            size="sm"
          >
            {user?.name}
          </Heading>
        </VStack>
      </HStack>

      <Pressable onPress={logoutHandler} className="text-white">
        <ExitIcon color={"#C4C4CC"} />
      </Pressable>
    </HStack>
  );
};

const ExerciseHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <VStack space="md">
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowLeft color={"#00B37E"} />
      </Pressable>
      <HStack className="justify-between items-center">
        <Heading className="text-typography-50 font-roboto text-xl">
          {/* {route.params?.name} */}
        </Heading>
        <HStack space="xs" className="items-center">
          <PersonIcon color={"#7C7C8A"} />
          <Text className="text-typography-100 font-roboto text-base">
            Costas
          </Text>
        </HStack>
      </HStack>
    </VStack>
  );
};

const TitleHeader = ({ optionsBottomTabs }: OptionsBottomTabs) => {
  return (
    <Box className="justify-center items-center">
      <Heading className="text-typography-50 font-roboto text-xl">
        {optionsBottomTabs?.title}
      </Heading>
    </Box>
  );
};
