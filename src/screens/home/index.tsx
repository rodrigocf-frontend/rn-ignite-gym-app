import { Button, ButtonText } from "@/components/base/button";
import { NavigationParamList } from "@/routes/index.route";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation<NavigationParamList>();

  return (
    <Button>
      <ButtonText
        onPress={() =>
          navigation.navigate("authenticated", {
            screen: "exercise",
          })
        }
      >
        Go to Exercise
      </ButtonText>
    </Button>
  );
}
