import { StatusBar } from "expo-status-bar";
import "./global.css";
import { GluestackUIProvider, ModeType } from "config/gluestack-ui-provider";
import { Navigation } from "@/routes";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Box } from "@/components/base/box";

export default function App() {
  const [barVisibility, setBarVisibility] = useState(true);

  const hideNativeBar = async () => {
    await NavigationBar.setVisibilityAsync("hidden").finally(() => {
      setBarVisibility(false);
    });
  };

  useEffect(() => {
    console.log(Platform.OS);
    if (Platform.OS === "android") {
      hideNativeBar();
    }
  }, []);

  if (!barVisibility) {
    return (
      <GluestackUIProvider mode={"dark"}>
        <StatusBar style="light" />
        <Box className="flex-1 bg-primary-350">
          <Navigation />
        </Box>
      </GluestackUIProvider>
    );
  }
  return <></>;
}
