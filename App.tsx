import { StatusBar } from "expo-status-bar";
import "./global.css";
import { GluestackUIProvider } from "config/gluestack-ui-provider";
import { Login } from "@/screens/Login";

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
      <Login />
      <StatusBar style="dark" />
    </GluestackUIProvider>
  );
}
