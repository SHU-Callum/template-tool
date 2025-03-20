import * as CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_ENCRYPT_KEY;

function padKey(key: string): string {
  const length = key.length;
  if (length < 16) {
    return key.padEnd(16, '0');
  } else if (length < 24) {
    return key.padEnd(24, '0');
  } else if (length < 32) {
    return key.padEnd(32, '0');
  } else {
    return key.substring(0, 32);
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