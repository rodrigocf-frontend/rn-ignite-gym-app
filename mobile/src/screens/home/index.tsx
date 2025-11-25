import React, { use, useEffect, useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Box } from "@/components/base/box";
import { HStack } from "@/components/base/hstack";
import { Heading } from "@/components/base/heading";
import { Text } from "@/components/base/text";
import { ActiveButton } from "@/components/common/activebutton";
import { ExerciseType, ExerciseCard } from "@/components/ui/cards/exercisecard";
import { getExercisesByGroup, getGroups } from "@/services/exercises";
import { useNavigation } from "@react-navigation/native";
import { ToastContext } from "@/store/ToastContext";

export function Home() {
  const [selectedGroup, setSelectedGroup] = useState<string>("costas");
  const [groups, setGroups] = useState([]);
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation();
  const { handleToast } = use(ToastContext);

  const fetchGroups = async () => {
    try {
      const { data } = await getGroups();
      setGroups(data);
    } catch {
      handleToast({
        title: "Grupos",
        msg: "Falha ao buscar grupos.",
      });
    }
  };

  const fetchExerciesByGroup = async () => {
    try {
      const { data } = await getExercisesByGroup(selectedGroup);
      setExercises(data);
    } catch {
      handleToast({
        title: "Exercícios",
        msg: "Falha ao buscar exercícios.",
      });
    }
  };

  const renderMuscleButton: ListRenderItem<string> = ({ item }) => {
    const isSelected = item === selectedGroup;

    return (
      <Box className="ml-3">
        <ActiveButton
          onPress={() => setSelectedGroup(item)}
          isSelected={isSelected}
        >
          {item}
        </ActiveButton>
      </Box>
    );
  };

  const handleExercisePress = (exercise: ExerciseType): void => {
    navigation.navigate("authenticated", {
      screen: "exercise",
      params: {
        id: exercise.id,
      },
    });
  };

  const renderExerciseCard: ListRenderItem<ExerciseType> = ({ item }) => (
    <ExerciseCard data={item} onPress={() => handleExercisePress(item)} />
  );

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    fetchExerciesByGroup();
  }, [selectedGroup]);

  return (
    <Box className="flex-1">
      {/* Lista de grupos musculares */}
      <Box className="my-10 pb-4  ">
        <FlatList
          data={groups}
          renderItem={renderMuscleButton}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Box>

      {/* Header de Exercícios */}
      <HStack className="justify-between items-center px-8 mb-5">
        <Heading size="md" className=" text-typography-100 font-roboto">
          Exercícios
        </Heading>
        <Text size="sm" className="text-typography-100 font-roboto">
          {exercises.length}
        </Text>
      </HStack>

      {/* Lista de Exercícios */}
      <FlatList
        data={exercises}
        renderItem={renderExerciseCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
