import { Box } from "@/components/base/box";
import { Image } from "@/components/base/image";
import { VStack } from "@/components/base/vstack";
import { AppButton } from "@/components/common/appbutton";
import { HStack } from "@/components/base/hstack";
import { Text } from "@/components/base/text";
import { Icon, createIcon } from "@/components/base/icon";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AuthenticatedStackParamList } from "@/routes/authenticated.route";
import { api } from "@/config/axios-instance";
import { use, useCallback, useEffect, useState } from "react";
import { ExerciseType } from "@/components/ui/cards/exercisecard";
import { getExerciseDetails } from "@/services/exercises";
import { RepeatIcon } from "lucide-react-native";
import { Path } from "react-native-svg";
import { AuthContext } from "@/store/AuthContext";
import { createHistory } from "@/services/histories";

type ExerciseScreenProps = RouteProp<AuthenticatedStackParamList, "exercise">;

const BarbellIcon = createIcon({
  viewBox: "0 0 32 32",
  path: (
    <>
      <Path
        fill="currentColor"
        d="M4.5 6C4.5 5.17157 5.17157 4.5 6 4.5H8.25C9.07843 4.5 9.75 5.17157 9.75 6V18C9.75 18.8284 9.07843 19.5 8.25 19.5H6C5.17157 19.5 4.5 18.8284 4.5 18V6ZM8.25 6H6V18H8.25V6Z"
      />
      <Path
        fill="currentColor"
        d="M14.25 6C14.25 5.17157 14.9216 4.5 15.75 4.5H18C18.8284 4.5 19.5 5.17157 19.5 6V18C19.5 18.8284 18.8284 19.5 18 19.5H15.75C14.9216 19.5 14.25 18.8284 14.25 18V6ZM18 6H15.75V18H18V6Z"
      />
      <Path
        fill="currentColor"
        d="M18 7.5C18 7.08579 18.3358 6.75 18.75 6.75H21C21.3978 6.75 21.7794 6.90804 22.0607 7.18934C22.342 7.47065 22.5 7.85218 22.5 8.25V15.75C22.5 16.1478 22.342 16.5294 22.0607 16.8107C21.7794 17.092 21.3978 17.25 21 17.25H18.75C18.3358 17.25 18 16.9142 18 16.5C18 16.0858 18.3358 15.75 18.75 15.75H21L21 8.25L18.75 8.25C18.3358 8.25 18 7.91421 18 7.5Z"
      />
      <Path
        fill="currentColor"
        d="M1.93934 7.18934C2.22064 6.90804 2.60217 6.75 3 6.75H5.25C5.66421 6.75 6 7.08579 6 7.5C6 7.91421 5.66421 8.25 5.25 8.25L3 8.25V15.75H5.25C5.66421 15.75 6 16.0858 6 16.5C6 16.9142 5.66421 17.25 5.25 17.25H3C2.60218 17.25 2.22065 17.092 1.93934 16.8107C1.65803 16.5294 1.5 16.1478 1.5 15.75V8.25C1.5 7.85218 1.65804 7.47064 1.93934 7.18934Z"
      />
      <Path
        fill="currentColor"
        d="M8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H9C8.58579 12.75 8.25 12.4142 8.25 12Z"
      />
      <Path
        fill="currentColor"
        d="M21 12C21 11.5858 21.3358 11.25 21.75 11.25H23.25C23.6642 11.25 24 11.5858 24 12C24 12.4142 23.6642 12.75 23.25 12.75H21.75C21.3358 12.75 21 12.4142 21 12Z"
      />
      <Path
        fill="currentColor"
        d="M0 12C0 11.5858 0.335786 11.25 0.75 11.25H2.25C2.66421 11.25 3 11.5858 3 12C3 12.4142 2.66421 12.75 2.25 12.75H0.75C0.335786 12.75 0 12.4142 0 12Z"
      />
    </>
  ),
});

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseType>();
  const route = useRoute<ExerciseScreenProps>();
  const id = route.params.id;
  const { user } = use(AuthContext);
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  const postHistoryHandler = async () => {
    try {
      setLoading(true);
      if (user) {
        await createHistory({
          exercise_id: id,
        });

        navigation.navigate("authenticated", {
          screen: "history",
        });
      }
    } catch {
      setLoading((prevState) => !prevState);
    }
  };

  const fetchExerciseDetail = async () => {
    try {
      const { data } = await getExerciseDetails(id);
      setExercise(data);
    } catch {}
  };

  useEffect(() => {
    fetchExerciseDetail();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
    }, [])
  );

  return (
    <Box className=" flex-1 ">
      <VStack className="flex-1 p-8">
        <HStack className="flex-1">
          <Image
            className="rounded-2"
            size="full"
            source={{
              uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`,
            }}
            alt="image"
          />
        </HStack>

        <Box className="mb-32 bg-primary-300 mt-3 rounded-lg p-4">
          <VStack>
            <Box className="mb-6 mt-1">
              <HStack className="justify-between px-7">
                <HStack space="sm" className="items-center">
                  <Icon
                    as={BarbellIcon}
                    className="text-secondary-50 text-6xl"
                    size="xl"
                  />
                  <Text className="font-roboto text-typography-100 text-xl">
                    {exercise?.series} séries
                  </Text>
                </HStack>
                <HStack space="sm" className="items-center">
                  <Icon
                    as={RepeatIcon}
                    size={"xl"}
                    className="stroke-secondary-50"
                  />
                  <Text className="font-roboto text-typography-100 text-xl">
                    {exercise?.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
            </Box>
            <AppButton
              isLoading={isLoading}
              variant="solid"
              onPress={postHistoryHandler}
            >
              Marcar como realizado
            </AppButton>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
