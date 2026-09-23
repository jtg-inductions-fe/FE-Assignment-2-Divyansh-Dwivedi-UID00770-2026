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
