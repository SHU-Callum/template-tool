// used for providing the authentication context to the app

import { ReactNode, useRef, useState } from 'react';
import { AuthContext, UserAuthDetails } from './authContext';
import Keycloak from 'keycloak-js';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAuthDetails, setUserDetails] = useState<UserAuthDetails | null>(null);
  const [authMsg, setAuthMsg] = useState('Authenticating...')
  const authenticationAttempted = useRef(false);

  const initializeAuth = () => {
    if (!authenticationAttempted.current) {
      authenticationAttempted.current = true;
      setAuthMsg('Authenticating...');
      const client = new Keycloak({
        url: import.meta.env.VITE_KC_URL,
        realm: import.meta.env.VITE_KC_REALM,
        clientId: import.meta.env.VITE_KC_CLIENT,
      });

      client
        .init({ onLoad: 'login-required' })
        .then((authenticated) => {
          if (authenticated) {
            setIsLoggedIn(true);
            setAuthMsg(`Authenticated`)
            setUserDetails({
              username: client.tokenParsed?.preferred_username,
              email: client.tokenParsed?.email,
              roles: client.tokenParsed?.realm_access?.roles || [],
              accessToken: client.token,
              refreshToken: client.refreshToken,
              expiresIn: client.tokenParsed?.exp,
            });
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setAuthMsg(`Authentication Failed: ${error.error}`)
        });
    }
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, userAuthDetails: userAuthDetails, initializeAuth, authMsg }}>
      {children /* renders app.tsx etc. */ }
    </AuthContext.Provider>
  );
};