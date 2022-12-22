import { type Article } from './entity.js'

export interface ArticleRepository {
  allPublicArticles(): Promise<Array<Article>>
  findById(_id: number): Promise<Article>
  findByAccountId(_accountId: number): Promise<Array<Article>>
  findByTitle(_title: string): Promise<Array<Article>>
}
