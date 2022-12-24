import { type Article } from './entity.js'

export interface ArticleRepository {
  findById(_id: number): Promise<Article>
  save(_article: Article): Promise<Article>
}
