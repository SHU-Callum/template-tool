import * as CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_ENCRYPT_KEY;

// Pads the key to ensure necessary length for AES encryption
function padKey(key: string): string {
  if (key.length <= 16) {
    return key.padEnd(16, '0'); // Pad to 16 bytes
  } else if (key.length <= 24) {
    return key.padEnd(24, '0'); // Pad to 24 bytes
  } else {
    return key.padEnd(32, '0').substring(0, 32); // Pad or truncate to 32 bytes
  }
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
  const encodedEncryptedParameter = encodeURIComponent(encryptedParameter); // Encode the encrypted parameter for URI
  return {
      encryptedParameter: encodedEncryptedParameter,
      iv: encodedIV
  };
};