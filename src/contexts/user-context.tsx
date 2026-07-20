"use client";
import * as React from "react";
import type { User } from "@/types/user";

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setError(null);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, error, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para usar el contexto
export function useUser() {
  const ctx = React.useContext(UserContext);
  if (!ctx) throw new Error("useUser debe usarse dentro de UserProvider");
  return ctx;
}


// 'use client';

// import * as React from 'react';

// import type { User } from '@/types/user';
// import { authClient } from '@/lib/auth/client';
// import { logger } from '@/lib/default-logger';

// export interface UserContextValue {
//   user: User | null;
//   error: string | null;
//   isLoading: boolean;
//   checkSession?: () => Promise<void>;
// }

// export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

// export interface UserProviderProps {
//   children: React.ReactNode;
// }

// export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
//   const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
//     user: null,
//     error: null,
//     isLoading: true,
//   });

//   const checkSession = React.useCallback(async (): Promise<void> => {
//     try {
//       const { data, error } = await authClient.getUser();

//       if (error) {
//         logger.error(error);
//         setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
//         return;
//       }

//       setState((prev) => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
//     } catch (error) {
//       logger.error(error);
//       setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
//     }
//   }, []);

//   React.useEffect(() => {
//     checkSession().catch((error) => {
//       logger.error(error);
//       // noop
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
//   }, []);

//   return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
// }

// export const UserConsumer = UserContext.Consumer;
