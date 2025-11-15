import { Login } from "@/screens/login";

import { SignUp } from "@/screens/signup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type PublicStackParamList = {
  login: undefined;
  signup: undefined;
};

export const PublicStack = createNativeStackNavigator<PublicStackParamList>();

export const PublicRoutes = () => {
  return (
    <PublicStack.Navigator
      screenOptions={{
        animation: "fade",
        headerShown: false,
        contentStyle: {
          backgroundColor: "rgb(18,18,20)",
        },
      }}
    >
      <PublicStack.Screen name="login" component={Login} />
      <PublicStack.Screen name="signup" component={SignUp} />
    </PublicStack.Navigator>
  );
};
