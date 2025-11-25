import { setLogoutHandler } from "@/config/api";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { clearAuthenticate } from "@/services/auth";
import { setStorageUser } from "@/storage/user";

export type User = {
  name: string;
  email: string;
  avatar: string;
  id: number;
};

type AuthHandlers = {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (name: Partial<User>) => Promise<void>;
};

type AuthState = {
  user: User | null;
} & AuthHandlers;

const initialState: AuthState = {
  user: null,
  login: (user: User) => {},
  logout: () => {},
  updateUser: async (user: Partial<User>) => {},
};

export const AuthContext = createContext<AuthState>(initialState);

export function AuthProvider({
  children,
  user,
}: PropsWithChildren<{ user: User | null }>) {
  const [state, setState] = useState(user);

  const login = (user: User) => setState(user);

  const logout = () => {
    setState(null);
    clearAuthenticate();
  };

  const updateUser = async (user: Partial<User>) => {
    await setStorageUser({
      ...state,
      ...user,
    });
    setState((prevState) => {
      if (!prevState) {
        return prevState;
      }
      return {
        ...prevState,
        ...user,
      };
    });
  };

  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  useEffect(() => {
    if (user) {
      login(user);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user: state,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
