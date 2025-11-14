import { Login } from "@/screens/Login";
import { SignUp } from "@/screens/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StaticParamList,
  createStaticNavigation,
} from "@react-navigation/native";

const RootStack = createNativeStackNavigator({
  groups: {
    Public: {
      screenOptions: {
        animation: "fade",
        headerShown: false,
        contentStyle: {
          backgroundColor: "rgb(18,18,20)",
        },
      },
      screens: {
        Login,
        SignUp,
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
