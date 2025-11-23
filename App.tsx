import "./global.css";
import { Box } from "@/components/base/box";
import { Routes } from "@/routes/index.route";
import { Providers } from "@/store";
import { SystemBars } from "react-native-edge-to-edge";

export default function App() {
  return (
    <Providers>
      <Box className="flex-1 bg-primary-350">
        <Routes />
      </Box>
      <SystemBars
        hidden={{
          navigationBar: true,
        }}
        style={{
          navigationBar: "dark",
          statusBar: "light",
        }}
      />
    </Providers>
  );
}
