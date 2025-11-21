import { User } from "@/store/AuthContext";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { refreshAuthenticate } from "@/services/auth";
import { getStorageUser } from "@/storage/user";

export const useBootstrap = (): { user: User | null; isReady: boolean } => {
  const [preload, setPreload] = useState({
    user: false,
  });

  const [user, setUser] = useState<User | null>(null);

  const checkIsAuthenticated = async () => {
    try {
      const user = await getStorageUser();

      if (user) {
        const newRefreshToken = await refreshAuthenticate();

        if (newRefreshToken) {
          setUser({
            avatar: user.avatar,
            email: user.email,
            id: user.id,
            name: user.name,
          });
        } else {
          setUser(null);
        }
      }
    } catch {
      setUser(null);
    } finally {
      setPreload((prevState) => ({
        ...prevState,
        user: true,
      }));
    }
  };

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  const isReady = preload.user;

  return {
    isReady,
    user,
  };
};
