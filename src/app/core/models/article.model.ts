export interface GetArticlesResponse {
  articles: Article[];
  articles_count: number;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  image: string;
  createdAt: string;
  lastModified: string;
  author: AuthorDetails;
}

export interface AuthorDetails {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface GetUserArticlesResponse {
  articles: Article[];
  articles_count: number;
}

export interface CreateArticleRequest {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  image: string;
}

export interface ArticleResponse {
  success: boolean;
  message: string;
  data: Article;
  timestamp: string;
}

export interface AuthorResponse {
  authorId: number;
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ArticleResponseData {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  image: string;
  createdAt: string;
  lastModified: string;
  author: AuthorResponse;
}
