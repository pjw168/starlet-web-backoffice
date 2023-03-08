import { PAGE_CODE } from '@constants/pageCode';

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_TABLE_SCROLL_X = { x: 1280 };

export const enum FILE_EXTENSION {
  JPEG = 'image/jpeg',
  JPG = 'image/jpeg',
  PNG = 'image/png',
  ZIP = 'application/zip',
}

export const enum MENU_KEY {
  DASHBOARD = PAGE_CODE.DASHBOARD,
  ARTISTS = PAGE_CODE.ARTISTS,
  SUPPORTERS = PAGE_CODE.SUPPORTERS,
  PROJECTS = PAGE_CODE.PROJECTS,
  SETTINGS = PAGE_CODE.SETTINGS,
}

export const enum PROJECT_STATE {
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
}
