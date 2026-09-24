export const APP_ROUTES = {
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  DASHBOARD: {
    BASE: '/dashboard',
    ARTICLE: '/dashboard/article',
    MY_ARTICLES: '/dashboard/my-articles',
    CREATE_ARTICLE: '/dashboard/create-article',
    UPDATE_ARTICLE: '/dashboard/update-article',
  },
  NOT_FOUND: '/not-found',
} as const;
