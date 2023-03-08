export const ENDPOINT = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

// auth
export const BASE_AUTH = `${ENDPOINT}/auth`;
export const AUTH_LOGIN = `${BASE_AUTH}/login`;
export const AUTH_ME = `${BASE_AUTH}/me`;

// artists
export const BASE_ARTISTS = `${ENDPOINT}/artists`;
export const ARTISTS_BY_ID = `${BASE_ARTISTS}/:id`;
export const ARTISTS_SEARCH = `${BASE_ARTISTS}/search`;

// supporters
export const BASE_SUPPORTERS = `${ENDPOINT}/supporters`;
export const SUPPORTERS_SEARCH = `${BASE_SUPPORTERS}/search`;
export const SUPPORTERS_BY_ID = `${BASE_SUPPORTERS}/:id`;

// project
export const BASE_PROJECTS = `${ENDPOINT}/projects`;
export const PROJECT_BY_ID = `${BASE_PROJECTS}/:id`;
export const PROJECT_PUBLISH = `${BASE_PROJECTS}/publish`;
export const PROJECT_UNPUBLISH = `${BASE_PROJECTS}/unpublish`;
export const PROJECT_GET_PUBLISHED = `${BASE_PROJECTS}/published`;
export const PROJECT_SEARCH = `${BASE_PROJECTS}/search`;

// project-fanbases
export const BASE_PROJECT_FANBASES = `${ENDPOINT}/project-fanbases`;
export const PROJECT_FANBASE_BY_PROJECT_ID = `${BASE_PROJECT_FANBASES}/project/:projectId`;

// project-fanbase-monthly-listeners
export const BASE_PROJECT_FANBASE_MONTHLY_LISTENERS = `${ENDPOINT}/project-fanbase-monthly-listeners`;
export const PROJECT_FANBASE_MONTHLY_LISTENERS_BY_PROJECT_ID = `${BASE_PROJECT_FANBASE_MONTHLY_LISTENERS}/project/:projectId`;
export const PROJECT_FANBASE_MONTHLY_LISTENERS_BY_ID_LIST = `${BASE_PROJECT_FANBASE_MONTHLY_LISTENERS}/by-id-list`;
