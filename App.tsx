import "./global.css";
import { Box } from "@/components/base/box";
import { Routes } from "@/routes/index.route";
import { Providers } from "@/store";
import { SystemBars } from "react-native-edge-to-edge";

type Style = "auto" | "inverted" | "light" | "dark";

type SystemBarsProps = {
  // set the color of the system bar content (as no effect on semi-opaque navigation bar)
  style?: Style | { statusBar?: Style; navigationBar?: Style };
  // hide system bars (the navigation bar cannot be hidden on iOS)
  hidden?: boolean | { statusBar?: boolean; navigationBar?: boolean };
};

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
