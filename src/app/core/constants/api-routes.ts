export const API_ROUTES = {
  USERS: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    USER_PROFILE: '/users/me',
  },
  ARTICLE: {
    ARTICLES: '/articles',
    MY_ARTICLES: '/articles/my',
  },
} as const;
