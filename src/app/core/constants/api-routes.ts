export const API_ROUTES = {
  AUTH: {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
  },
  ARTICLE: {
    ARTICLES: '/articles',
    MY_ARTICLES: '/articles/my',
  },
} as const;
