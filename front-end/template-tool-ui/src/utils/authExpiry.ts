export const isTokenExpired = (expiresIn: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return currentTime >= expiresIn;
};
