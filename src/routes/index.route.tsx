import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { PublicRoutes, PublicStackParamList } from "./public.routes";
import {
  AuthenticatedRoutes,
  AuthenticatedStackParamList,
} from "./authenticated.routes";

export type RootStackParamList = {
  public: {
    screen?: keyof PublicStackParamList;
  };
  authenticated: {
    screen?: keyof AuthenticatedStackParamList;
  };
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export type NavigationParamList = NativeStackNavigationProp<RootStackParamList>;

export const Routes = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          animation: "fade",
          headerShown: false,
          contentStyle: {
            backgroundColor: "rgb(18,18,20)",
          },
        }}
      >
        <RootStack.Screen name="public" component={PublicRoutes} />
        <RootStack.Screen
          name="authenticated"
          component={AuthenticatedRoutes}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
