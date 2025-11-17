import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthContext";

export function Providers({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}
