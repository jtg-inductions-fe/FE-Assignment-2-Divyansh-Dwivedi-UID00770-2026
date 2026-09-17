export interface GetArticlesResponse {
  success: boolean;
  message: string;
  data: ArticleData;
  timestamp: string;
}

export interface ArticleData {
  data: Article[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface GetUserArticlesResponse {
  success: boolean;
  data: Article[];
  timestamp: string;
}

export interface GetArticleById {
  success: boolean;
  message: string;
  data: Article;
  timestamp: string;
}
