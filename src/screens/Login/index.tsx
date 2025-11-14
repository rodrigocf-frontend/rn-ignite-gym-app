import { Button, ButtonText } from "@/components/base/button";
import { SafeAreaView } from "react-native-safe-area-context";

export function Login() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button variant="solid" action="negative">
        <ButtonText>Login</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
