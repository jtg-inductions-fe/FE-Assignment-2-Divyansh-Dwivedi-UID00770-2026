export const APP_ROUTES = {
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  DASHBOARD: {
    BASE: '/dashboard',
    ARTICLE: '/article',
    MY_ARTICLES: '/my-articles',
    CREATE_ARTICLE: '/create-article',
    UPDATE_ARTICLE: '/update-article',
  },
  NOT_FOUND: '/not-found',
} as const;
