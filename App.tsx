import { StatusBar } from "expo-status-bar";
import "./global.css";
import { GluestackUIProvider } from "config/gluestack-ui-provider";
import { Navigation } from "@/routes";

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
      <Navigation />
      <StatusBar style="dark" />
    </GluestackUIProvider>
  );
}
