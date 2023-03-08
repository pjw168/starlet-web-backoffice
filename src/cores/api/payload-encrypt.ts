import CryptoJS from 'crypto-js';

export interface Encryptor {
  encrypt(text: string): string;
  decrypt(encrypted: string): string;
}

class PayloadEncryptor {
  private static key = CryptoJS.enc.Utf8.parse(
    process.env.NEXT_PUBLIC_PAYLOAD_ENCRYPT_KEY ?? '',
  );
  private static iv = CryptoJS.enc.Utf8.parse(
    process.env.NEXT_PUBLIC_PAYLOAD_ENCRYPT_IV ?? '',
  );

  static encrypt(text: string): string {
    const encrypt = CryptoJS.AES.encrypt(text, this.key, {
      iv: this.iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    }).ciphertext.toString(CryptoJS.enc.Base64);
    return encrypt;
  }

  static decrypt(encrypted: string): string {
    return CryptoJS.AES.decrypt(encrypted, PayloadEncryptor.key).toString();
  }
}

export { PayloadEncryptor };
