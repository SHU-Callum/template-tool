import axios from 'axios';

const authorisedAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`,
  timeout: 5000,
});

export const setupAxiosInterceptors = (accessToken: string, refreshToken: string, setAuthTokens: (accessToken: string, refreshToken: string) => void) => {
  authorisedAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  authorisedAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log('Error in response interceptor:', error);
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          console.log('Refreshing token...');
          const response = await axios.post(`${import.meta.env.VITE_KC_URL}/realms/${import.meta.env.VITE_KC_REALM}/protocol/openid-connect/token`, { refreshToken });
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
          setAuthTokens(newAccessToken, newRefreshToken); // Update the tokens in Auth Context
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return authorisedAxios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};
  

export default authorisedAxios;