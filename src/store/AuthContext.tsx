import { PropsWithChildren, createContext, useState } from "react";

type User = {
  name: string;
  email: string;
  avatar: string;
  id: number;
};

type AuthHandlers = {
  login: (user: User) => void;
  logout: () => void;
  updateUser: (name: Partial<User>) => void;
};

type AuthState = {
  user: User | null;
} & AuthHandlers;

const initialState: AuthState = {
  user: null,
  login: (user: User) => {},
  logout: () => {},
  updateUser: (user: Partial<User>) => {},
};

export const AuthContext = createContext<AuthState>(initialState);

export function AuthProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState(initialState.user);

  const login = (user: User) => setState(user);

  const logout = () => setState(null);

  const updateUser = (user: Partial<User>) =>
    setState((prevState) => {
      if (!prevState) {
        return prevState;
      }
      return {
        ...prevState,
        ...user,
      };
    });

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
