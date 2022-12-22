import { Inject, Service } from 'autoinjection'
import { type ArticleRepository } from '@/domain/model/article/repository.js'
import { type Article } from '../../domain/model/article/entity.js'

@Service({ singleton: true })
export class ArticleService {
  // eslint-disable-next-line no-unused-vars
  constructor(@Inject() private readonly articleRepository?: ArticleRepository) {}

  async allPublicArticles(): Promise<Array<Article>> {
    return await this.articleRepository!.allPublicArticles()
  }

  async findById(id: number): Promise<Article> {
    return await this.articleRepository!.findById(id)
  }

  async findByAccountId(accountId: number): Promise<Array<Article>> {
    return await this.articleRepository!.findByAccountId(accountId)
  }

  async findByTitle(title: string): Promise<Array<Article>> {
    return await this.articleRepository!.findByTitle(title)
  }
}
