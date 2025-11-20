import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PublicRoutes, PublicStackParamList } from "./public.route";
import {
  AuthenticatedRoutes,
  AuthenticatedStackParamList,
} from "./authenticated.route";
import React, { use } from "react";
import { AuthContext } from "@/store/AuthContext";

type RootStackParamList = {
  public: NavigatorScreenParams<PublicStackParamList>;
  authenticated: NavigatorScreenParams<AuthenticatedStackParamList>;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
  const { user } = use(AuthContext);

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
        {user ? (
          <RootStack.Screen
            name="authenticated"
            component={AuthenticatedRoutes}
          />
        ) : (
          <RootStack.Screen name="public" component={PublicRoutes} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
