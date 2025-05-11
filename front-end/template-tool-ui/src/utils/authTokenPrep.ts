import axios, { isAxiosError } from 'axios';

let accessToken: string | null = null;

// Called when token has updated
export function setInterceptAccessToken(token: string) {
  accessToken = token;
}

// Creates an instance of axios with a base URL and timeout
const authorisedAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`,
  timeout: 5000,
});

export const setupAxiosInterceptors = (refreshAccessToken: () => Promise<void>) => {
  authorisedAxios.interceptors.request.use(
    (config) => { // Add the access token to the request headers
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  authorisedAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if(isAxiosError(error) ){
        const originalRequest = error.config;
        if (error.response?.status === 401 && originalRequest && !originalRequest.headers['Refreshed']) {
          try {
            console.log('Axios error:', error);
            await refreshAccessToken(); // Refresh the access token
            originalRequest.headers['Refreshed'] = true;
            return authorisedAxios(originalRequest);
          } catch (refreshError) {
              console.error('Error refreshing token:', refreshError);
              return Promise.reject(refreshError);
          }
        }
      } else {
        console.log('error:', error);
      }    
      return Promise.reject(error);
    }
  );
};

// Decodes a JWT token and returns the payload
export const parseToken = (token: string): { exp: number } | null => {
  try {
    const payload = token.split('.')[1]; // Extract the payload part of the JWT
    const decoded = atob(payload); // Decode the base64 string
    return JSON.parse(decoded); // Parse the JSON payload
  } catch (error) {
    console.error('Failed to parse token:', error);
    return null;
  }
};
  

export default authorisedAxios;