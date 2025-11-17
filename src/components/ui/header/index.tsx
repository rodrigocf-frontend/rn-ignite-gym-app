import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/base/avatar";
import { Box } from "@/components/base/box";
import { Heading } from "@/components/base/heading";
import { HStack } from "@/components/base/hstack";
import { Icon } from "@/components/base/icon";
import { Pressable } from "@/components/base/pressable";
import { Text } from "@/components/base/text";
import { VStack } from "@/components/base/vstack";
import { AuthenticatedStackParamList } from "@/routes/authenticated.route";
import { AuthContext } from "@/store/AuthContext";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft, LogOutIcon } from "lucide-react-native";
import { PersonIcon } from "phosphor-react-native";
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
  const navigation = useNavigation();
  const { user } = use(AuthContext);

  console.log(user);

  return (
    <HStack className="justify-between items-center">
      <HStack space="lg">
        <Avatar size="lg">
          <AvatarFallbackText>Jane Doe</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
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

      <Pressable onPress={() => navigation.goBack()}>
        <Icon
          className="text-primary-100"
          as={LogOutIcon}
          width={"150px"}
          size="xl"
        />
      </Pressable>
    </HStack>
  );
};

const ExerciseHeader = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<AuthenticatedStackParamList, "exercise">>();

  return (
    <VStack space="md">
      <Pressable onPress={() => navigation.goBack()}>
        <Icon className="text-secondary-0" as={ArrowLeft} size="xl" />
      </Pressable>
      <HStack className="justify-between items-center">
        <Heading className="text-typography-50 font-roboto text-xl">
          {route.params.name}
        </Heading>
        <HStack space="xs" className="items-center">
          <Icon fill="#7C7C8A" stroke="#7C7C8A" as={PersonIcon} size="md" />
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
