import { Button, ButtonText } from "@/components/base/button";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation();

  return (
    <Button>
      <ButtonText
        onPress={() =>
          navigation.navigate("authenticated", {
            screen: "exercise",
            params: {
              name: "Puxada Frontal",
            },
          })
        }
      >
        Go to Exercise
      </ButtonText>
    </Button>
  );
}
