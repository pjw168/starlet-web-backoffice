import { AuthData } from '@services/models/auth';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const authDataAtom = atomWithStorage<AuthData | null>('authData', null);
export const authTokenAtom = atomWithStorage<string | null>('token', null);
export const authTokenExpiryAtom = atomWithStorage<string | null>(
  'tokenExpiry',
  null,
);

export const selectedMenuKeyAtom = atomWithStorage<string[] | undefined>(
  'selectedMenuKey',
  undefined,
);

export const isSmallScreenAtom = atom(false);
export const isCollapsedAtom = atom(false);
export const unreadNotificationsAtom = atom<number | null>(null);
