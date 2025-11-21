import { PropsWithChildren, useEffect, useState } from "react";
import { AuthProvider, User } from "./AuthContext";
import { ToastProvider } from "./ToastContext";
import { GluestackUIProvider } from "@/config/gluestack-ui-provider";
import { useBootstrap } from "@/hooks/use-bootstrap";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export function Providers({ children }: PropsWithChildren) {
  const { isReady, user } = useBootstrap();

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <GluestackUIProvider>
      <AuthProvider user={user}>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </GluestackUIProvider>
  );
}
