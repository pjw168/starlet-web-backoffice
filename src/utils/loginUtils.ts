import { STORAGE_KEY } from '@constants/storageKeys';

export function getAuthToken() {
  return localStorage.getItem(STORAGE_KEY.AUTH_TOKEN) ?? null;
}
