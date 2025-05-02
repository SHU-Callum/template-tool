export const isTokenExpired = (expiresIn: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  //format to readable date
  // const date = new Date(expiresIn * 1000);
  // const formattedDate = date.toLocaleString('en-UK', {
  //   year: 'numeric',
  //   month: '2-digit',
  //   day: '2-digit',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  //   hour12: false,
  // });
  // console.log('Token expires at:', formattedDate);
  return currentTime >= expiresIn;
};
