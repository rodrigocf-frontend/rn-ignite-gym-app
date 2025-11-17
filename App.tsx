import { StatusBar } from "expo-status-bar";
import "./global.css";
import { GluestackUIProvider, ModeType } from "config/gluestack-ui-provider";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Box } from "@/components/base/box";
import { Routes } from "@/routes/index.route";
import { Providers } from "@/store";

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
      <Providers>
        <GluestackUIProvider mode={"dark"}>
          <Box className="flex-1 bg-primary-350">
            <Routes />
          </Box>
        </GluestackUIProvider>
        <StatusBar style="light" />
      </Providers>
    );
  }
  return <></>;
}
