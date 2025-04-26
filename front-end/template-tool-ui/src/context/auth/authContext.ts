// // used for creating the authentication context

import { createContext } from 'react';

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);