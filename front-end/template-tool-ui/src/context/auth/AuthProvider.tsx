// used for providing the authentication context to the app

import { ReactNode, useState } from 'react';
import { AuthContext } from './authContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children /* renders app.tsx etc. */ }
    </AuthContext.Provider>
  );
};