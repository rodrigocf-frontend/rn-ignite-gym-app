import React, { useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Box } from "@/components/base/box";

import { HStack } from "@/components/base/hstack";
import { Heading } from "@/components/base/heading";
import { Text } from "@/components/base/text";
import { ActiveButton } from "@/components/common/activebutton";
import { ExerciseCard } from "@/components/ui/cards/exercisecard";

// Tipos
interface MuscleGroup {
  id: string;
  name: string;
}

export interface Exercise {
  id: string;
  name: string;
  series: number;
  reps: number;
  image: string;
}

type ExercisesByGroup = {
  [key: string]: Exercise[];
};

interface Props {
  onExercisePress?: (exercise: Exercise) => void;
}

// Dados mockados
const MUSCLE_GROUPS: MuscleGroup[] = [
  { id: "costas", name: "COSTAS" },
  { id: "biceps", name: "BÍCEPS" },
  { id: "triceps", name: "TRÍCEPS" },
  { id: "ombro", name: "OMBRO" },
  { id: "rider", name: "rider" },
];

const EXERCISES: ExercisesByGroup = {
  costas: [
    {
      id: "1",
      name: "Puxada frontal",
      series: 3,
      reps: 12,
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400",
    },
    {
      id: "2",
      name: "Remada curvada",
      series: 3,
      reps: 12,
      image:
        "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=400",
    },
    {
      id: "3",
      name: "Remada unilateral",
      series: 3,
      reps: 12,
      image:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400",
    },
    {
      id: "4",
      name: "Levantamento terra",
      series: 3,
      reps: 12,
      image:
        "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400",
    },
  ],
};

export function Home({ onExercisePress }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<string>("costas");

  const exercises = EXERCISES[selectedGroup] || [];

  const handleExercisePress = (exercise: Exercise): void => {
    onExercisePress?.(exercise);
    console.log("Exercise selected:", exercise);
  };

  const renderMuscleButton: ListRenderItem<MuscleGroup> = ({ item }) => {
    const isSelected = item.id === selectedGroup;

    return (
      <Box className="ml-3">
        <ActiveButton
          onPress={() => setSelectedGroup(item.id)}
          isSelected={isSelected}
        >
          {item.name}
        </ActiveButton>
      </Box>
    );
  };

  const renderExerciseCard: ListRenderItem<Exercise> = ({ item }) => (
    <ExerciseCard data={item} onPress={() => {}} />
  );

  return (
    <Box className="flex-1">
      {/* Lista de grupos musculares */}
      <Box className="my-10 pb-4  ">
        <FlatList
          data={MUSCLE_GROUPS}
          renderItem={renderMuscleButton}
          keyExtractor={(item) => item.id}
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 32, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
}
