import CryptoJS from 'crypto-js';

export const AesEncrypt = (data: any) => {
  const key = 'BODY-U1-N!0|RO|$^&@-enc-kEY_LEAD';
  const iv = '7777777a72ddc2f1';
  const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return cipher.toString();
};

export const AesDEncrypt = (data: any) => {
  const key = 'BODY-U1-N!0|RO|$^&@-enc-kEY_LEAD';
  const iv = '7777777a72ddc2f1';
  const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return cipher.toString(CryptoJS.enc.Utf8);
};
