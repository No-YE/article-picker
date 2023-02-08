import { type Article } from '~/domain/model/article/entity'

export interface ArticleContentService {
  loadContent(_article: Article): Promise<void>
}
