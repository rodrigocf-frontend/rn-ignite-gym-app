import { Header } from "@/components/ui/header";
import { Exercise } from "@/screens/exercise";
import { History } from "@/screens/history";
import { Home } from "@/screens/home";
import { Profile } from "@/screens/profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserCircleIcon } from "lucide-react-native";
import {
  ClockCounterClockwiseIcon,
  HouseSimpleIcon,
} from "phosphor-react-native";

export type AuthenticatedStackParamList = {
  home: undefined;
  exercise: {
    name: string;
  };
  history: undefined;
  profile: undefined;
};

const TabStack = createBottomTabNavigator<AuthenticatedStackParamList>();

export const AuthenticatedRoutes = () => {
  return (
    <TabStack.Navigator
      screenOptions={{
        sceneStyle: {
          backgroundColor: "rgb(18,18,20)",
        },
        tabBarActiveTintColor: "#00B37E",
        tabBarInactiveBackgroundColor: "#202024",
        tabBarActiveBackgroundColor: "#202024",
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 16,
          paddingBottom: 60,
          backgroundColor: "#202024",
        },
      }}
    >
      <TabStack.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({
            color,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => <HouseSimpleIcon size={32} color={color} />,
          header: () => <Header type="home" />,
        }}
      />
      <TabStack.Screen
        name="exercise"
        component={Exercise}
        options={{
          tabBarItemStyle: {
            display: "none",
          },
          header: () => <Header type="exercise" />,
        }}
      />
      <TabStack.Screen
        name="history"
        component={History}
        options={{
          title: "Histórico de Exercícios",
          tabBarIcon: ({
            color,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => <ClockCounterClockwiseIcon size={32} color={color} />,
          header: ({ options }) => (
            <Header type="title" optionsBottomTabs={options} />
          ),
        }}
      />
      <TabStack.Screen
        name="profile"
        component={Profile}
        options={{
          title: "Perfil",
          tabBarIcon: ({
            color,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => <UserCircleIcon size={32} color={color} />,
          header: ({ options }) => (
            <Header type="title" optionsBottomTabs={options} />
          ),
        }}
      />
    </TabStack.Navigator>
  );
};
