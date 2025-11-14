import { Button, ButtonText } from "@/src/components/base/button";
import { SafeAreaView } from "react-native-safe-area-context";

export function SignUp() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button variant="solid" action="positive">
        <ButtonText>SignUp</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
