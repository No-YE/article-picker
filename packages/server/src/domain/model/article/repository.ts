import { type Article } from './entity.js'

export interface ArticleRepository {
  allPublicArticles(): Promise<Array<Article>>
  findById(_id: number): Promise<Article>
}
