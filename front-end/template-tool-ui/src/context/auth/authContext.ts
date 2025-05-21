// // used for creating the authentication context

import { createContext } from 'react';

export interface AuthContextType {
  isLoggedIn: boolean;
  userAuthDetails: UserAuthDetails | null;
  initializeAuth: (localDetails?: UserAuthDetails) => void;
  refreshAccessToken: () => Promise<void>;
  authMsg: string;
  logout: () => void;
}

// Details are fetched by Keycloak on receiving token
export interface UserAuthDetails {
  kcid: string;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
  refreshTokenExpiresIn?: number;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);