import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthContext";
import { ToastProvider } from "./ToastContext";

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
}
