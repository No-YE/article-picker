import { type Article } from '~/domain/model/article/entity'

export interface ArticleContentService {
  laodContent(_article: Article): Promise<void>
}
