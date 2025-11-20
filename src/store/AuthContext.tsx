import { PropsWithChildren, createContext, useState } from "react";

type User = {
  name: string;
  email: string;
  avatar: null;
  id: number;
};

type AuthHandlers = {
  login: (user: User) => void;
  logout: () => void;
  setUsername: (name: string) => void;
};

type AuthState = {
  user: User | null;
} & AuthHandlers;

const initialState: AuthState = {
  user: null,
  login: (user: User) => {},
  logout: () => {},
  setUsername: (name: string) => {},
};

export const AuthContext = createContext<AuthState>(initialState);

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(initialState.user);

  const login = (user: User) => setState(user);

  const logout = () => setState(null);

  const setUsername = (name: string) =>
    setState((prevState) => {
      if (!prevState) {
        return prevState;
      }
      return {
        ...prevState,
        name,
      };
    });

  return (
    <AuthContext.Provider
      value={{
        user: state,
        login,
        logout,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
