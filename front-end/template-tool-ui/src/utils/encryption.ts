import * as CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_ENCRYPT_KEY;

function padKey(key: string): string {
  if (key.length <= 16) {
    return key.padEnd(16, '0'); // Pad to 16 bytes
  } else if (key.length <= 24) {
    return key.padEnd(24, '0'); // Pad to 24 bytes
  } else {
    return key.padEnd(32, '0').substring(0, 32); // Pad or truncate to 32 bytes
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function encrypt(data: any): string {
  const paddedKey = padKey(secretKey);
  const dataString = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(dataString, paddedKey).toString();
  // Encrypted and Encoded (Suitable for URI)
  return encodeURIComponent(encrypted);
}

export const encryptParameter = (parameter: string) => {
  const paddedKey = padKey(secretKey); // Pad key to compatible length  (16, 24, or 32 bytes)
  const cryptoKey = CryptoJS.enc.Utf8.parse(paddedKey); // Convert the key to WordArray
  const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV (16 bytes for AES)
  const encryptedParameter = CryptoJS.AES.encrypt(parameter, cryptoKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
  const encodedIV = CryptoJS.enc.Base64.stringify(iv); // Encode IV in Base64
  return {
      encryptedParameter,
      iv: encodedIV
  };
};