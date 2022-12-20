import { Inject, Service } from 'autoinjection'
import { type ArticleRepository } from '@/domain/model/article/repository'
import { type Article } from '../../domain/model/article/entity'

@Service({ singleton: true })
export class ArticleService {
  // eslint-disable-next-line no-unused-vars
  constructor(@Inject() private readonly articleRepository?: ArticleRepository) {}

  async allPublicArticles(): Promise<Array<Article>> {
    return this.articleRepository!.allPublicArticles()
  }
}
