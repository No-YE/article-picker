import { type Article } from './entity.js'

export interface ArticleRepository {
  allPublicArticles(): Promise<Array<Article>>;
}
