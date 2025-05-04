// used for providing the authentication context to the app

import { ReactNode, useRef, useState } from 'react';
import { AuthContext, UserAuthDetails } from './authContext';
import Keycloak from 'keycloak-js';
import { isTokenExpired } from '../../utils/authExpiry';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAuthDetails, setUserAuthDetails] = useState<UserAuthDetails | null>(null);
  const [authMsg, setAuthMsg] = useState('Authenticating...')
  const authenticationAttempted = useRef(false);

  const setAuthTokens = (accessToken: string, refreshToken: string) => {
    setUserAuthDetails((prevDetails) => {
      if (prevDetails) {
      const updatedDetails = {
        ...prevDetails,
        accessToken,
        refreshToken,
      };
      localStorage.setItem('userAuthDetails', JSON.stringify(updatedDetails));
      return updatedDetails;
      }
      return null;
    });
  };

  const initializeAuth = (localAuthDetails?: UserAuthDetails) => {
    if (localAuthDetails && localAuthDetails.expiresIn && !isTokenExpired(localAuthDetails.expiresIn)) {
      setUserAuthDetails(localAuthDetails);
      setIsLoggedIn(true);
      setAuthMsg('Authenticated');
      return;
    }
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
            const newAuthDetails = {
              kcid: client.subject || '',
              username: client.tokenParsed?.preferred_username,
              email: client.tokenParsed?.email,
              roles: client.tokenParsed?.realm_access?.roles || [],
              accessToken: client.token || '',
              refreshToken: client.refreshToken || '',
              expiresIn: client.tokenParsed?.exp,
            }
            setUserAuthDetails(newAuthDetails);
            localStorage.setItem(
              'userAuthDetails', JSON.stringify(newAuthDetails)
            );
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
    <AuthContext.Provider value={{ isLoggedIn, userAuthDetails, setAuthTokens, initializeAuth, authMsg }}>
      {children /* renders app.tsx etc. */ }
    </AuthContext.Provider>
  );
};