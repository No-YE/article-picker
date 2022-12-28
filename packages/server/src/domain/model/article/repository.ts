import { type Article } from './entity.js'

export interface ArticleRepository {
  findById(_accountId: number, _articleId: number): Promise<Article>
  save(_article: Article): Promise<Article>
  delete(_article: Article): Promise<void>
}
