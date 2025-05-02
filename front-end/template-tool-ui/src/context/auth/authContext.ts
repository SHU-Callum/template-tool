// // used for creating the authentication context

import { createContext } from 'react';

export interface AuthContextType {
  isLoggedIn: boolean;
  userAuthDetails: UserAuthDetails | null;
  setAuthTokens: (accessToken: string, refreshToken: string) => void;
  initializeAuth: (localDetails?: UserAuthDetails) => void;
  authMsg: string;
}

export interface UserAuthDetails {
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);