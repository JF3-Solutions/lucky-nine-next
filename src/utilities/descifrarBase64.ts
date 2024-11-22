import CryptoJS from 'crypto-js';

export const descifrarBase64=(dataBase64: string,key: string): string => {
  const secretKey=key;

  const keySha1=CryptoJS.SHA1(secretKey)
    .toString(CryptoJS.enc.Hex)
    .slice(0,32);

  const encryptedData=atob(dataBase64);

  const decrypted=CryptoJS.AES.decrypt(
    encryptedData,
    CryptoJS.enc.Hex.parse(keySha1),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  const decryptedStr=decrypted.toString(CryptoJS.enc.Utf8);

  return decryptedStr;
};
