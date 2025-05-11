// used for providing the authentication context to the app

import { ReactNode, useRef, useState } from 'react';
import { AuthContext, UserAuthDetails } from './authContext';
import Keycloak from 'keycloak-js';
import { isTokenExpired } from '../../utils/authExpiry';
import axios from 'axios';
import { parseToken, setInterceptAccessToken } from '../../utils/authTokenPrep';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state to check as a render condition
  const [userAuthDetails, setUserAuthDetails] = useState<UserAuthDetails | null>(null);
  const [authMsg, setAuthMsg] = useState('Authenticating...') // loading message
  const authenticationAttempted = useRef(false); // prevents authentication loop
  
  const client = new Keycloak({
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT,
  });

  const initializeAuth = (localAuthDetails?: UserAuthDetails) => {
    if (localAuthDetails && localAuthDetails.expiresIn && !isTokenExpired(localAuthDetails.expiresIn)) {
      setUserAuthDetails(localAuthDetails);
      setIsLoggedIn(true);
      applyTokens(localAuthDetails);
      setAuthMsg('Authenticated');
      return;
    }
    if (!authenticationAttempted.current) {
      authenticationAttempted.current = true;
      setAuthMsg('Authenticating...');

      client
        .init({ onLoad: 'login-required' })
        .then((authenticated) => {
          if (authenticated) {
            setIsLoggedIn(true);
            setAuthMsg(`Authenticated`);
            const newAuthDetails = {
              kcid: client.subject || '',
              username: client.tokenParsed?.preferred_username,
              email: client.tokenParsed?.email,
              roles: client.tokenParsed?.realm_access?.roles || [],
              accessToken: client.token || '',
              refreshToken: client.refreshToken || '',
              expiresIn: client.tokenParsed?.exp,
              refreshTokenExpiresIn: client.refreshTokenParsed?.exp,
            }
            applyTokens(newAuthDetails);
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

  const refreshAccessToken = async (): Promise<void> => {
    if(userAuthDetails && userAuthDetails.refreshToken && userAuthDetails.refreshTokenExpiresIn && !isTokenExpired(userAuthDetails.refreshTokenExpiresIn)) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_KC_URL}/realms/${import.meta.env.VITE_KC_REALM}/protocol/openid-connect/token`, 
          new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: userAuthDetails?.refreshToken || '',
            client_id: import.meta.env.VITE_KC_CLIENT,
          }));
        const { access_token: newAccessToken, refresh_token: newRefreshToken } = response.data;
        const newAccessTokenParsed = parseToken(newAccessToken);
        const newRefreshTokenParsed = parseToken(newRefreshToken);
        if(!newAccessTokenParsed || !newRefreshTokenParsed) {
          throw new Error('Failed to parse new access token');
        }
        const newAuthDetails = {
          ...userAuthDetails,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          expiresIn: newAccessTokenParsed.exp,
          refreshTokenExpiresIn: newRefreshTokenParsed.exp,
        }       
        applyTokens(newAuthDetails);
      } catch(error) {
        console.error('Error refreshing access token:', error);
        setIsLoggedIn(false);
        setAuthMsg(`Authentication Failed: ${error}`);
      }
    }
  };

  const applyTokens = (newAuthDetails: UserAuthDetails) => {
    setUserAuthDetails(newAuthDetails);
    localStorage.setItem('userAuthDetails', JSON.stringify(newAuthDetails));
    setInterceptAccessToken(newAuthDetails.accessToken) // future requests use this new token
  }
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, userAuthDetails, initializeAuth, refreshAccessToken, authMsg }}>
      {children /* renders app.tsx etc. */ }
    </AuthContext.Provider>
  );
};