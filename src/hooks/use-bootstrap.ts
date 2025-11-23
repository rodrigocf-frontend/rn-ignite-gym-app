import { User } from "@/store/AuthContext";
import { useEffect, useState } from "react";
import { refreshAuthenticate } from "@/services/auth";
import { getStorageUser } from "@/storage/user";

export const useBootstrap = (): { user: User | null; isReady: boolean } => {
  const [preload, setPreload] = useState({
    user: false,
  });

  const [user, setUser] = useState<User | null>(null);

  const checkIsAuthenticated = async () => {
    try {
      const userStorage = await getStorageUser();
      if (userStorage) {
        const newRefreshToken = await refreshAuthenticate();

        if (newRefreshToken) {
          setUser({
            avatar: userStorage.avatar,
            email: userStorage.email,
            id: userStorage.id,
            name: userStorage.name,
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
