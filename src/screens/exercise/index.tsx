import { Box } from "@/components/base/box";
import { Image } from "@/components/base/image";
import { VStack } from "@/components/base/vstack";
import { AppButton } from "@/components/common/appbutton";
import { HStack } from "@/components/base/hstack";
import { Text } from "@/components/base/text";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AuthenticatedStackParamList } from "@/routes/authenticated.route";
import { api } from "@/config/api";
import { use, useCallback, useEffect, useState } from "react";
import { ExerciseType } from "@/components/ui/cards/exercisecard";
import { getExerciseDetails } from "@/services/exercises";
import { AuthContext } from "@/store/AuthContext";
import { createHistory } from "@/services/histories";
import { ToastContext } from "@/store/ToastContext";
import { BarbelIcon, RepeatIcon } from "@/components/common/icons";

type ExerciseScreenProps = RouteProp<AuthenticatedStackParamList, "exercise">;

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseType>();
  const route = useRoute<ExerciseScreenProps>();
  const id = route.params.id;
  const { user } = use(AuthContext);
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const { handleToast } = use(ToastContext);

  const postHistoryHandler = async () => {
    try {
      setLoading(true);
      if (user) {
        const response = await createHistory({
          exercise_id: id,
        });

        handleToast({
          title: "Hitórico",
          msg: "Salvo com sucesso.",
          sucess: true,
        });

        navigation.navigate("authenticated", {
          screen: "history",
        });
      }
    } catch (e) {
      handleToast({
        title: "History",
        msg: "Falha ao salvar histórico",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchExerciseDetail = async () => {
    try {
      const { data } = await getExerciseDetails(id);

      setExercise(data);
    } catch {
      handleToast({
        title: "Failed",
        msg: "Failed fetch Exercise detail",
      });
    }
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
            alt="imagem do exercício"
          />
        </HStack>

        <Box className="mb-32 bg-primary-300 mt-3 rounded-lg p-4">
          <VStack>
            <Box className="mb-6 mt-1">
              <HStack className="justify-between px-7">
                <HStack space="sm" className="items-center">
                  <BarbelIcon color={"#00875F"} />
                  <Text className="font-roboto text-typography-100 text-xl">
                    {exercise?.series} séries
                  </Text>
                </HStack>
                <HStack space="sm" className="items-center">
                  <RepeatIcon color={"#00875F"} />
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
