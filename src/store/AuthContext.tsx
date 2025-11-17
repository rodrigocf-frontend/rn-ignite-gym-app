import { PropsWithChildren, createContext, useState } from "react";

type User = {
  name: string;
  email: "rodrigo@email.com";
  avatar: null;
};

type AuthHandlers = {
  login: (user: User) => void;
  logout: () => void;
};

type AuthState = {
  user: User | null;
} & AuthHandlers;

const initialState: AuthState = {
  user: null,
  login: (user: User) => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthState>(initialState);

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(initialState.user);

  const login = (user: User) => setState(user);

  const logout = () => setState(null);

  return (
    <AuthContext.Provider
      value={{
        user: state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
