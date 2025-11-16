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
import React from "react";

type RootStackParamList = {
  public: NavigatorScreenParams<PublicStackParamList>;
  authenticated: NavigatorScreenParams<AuthenticatedStackParamList>;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();

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

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
