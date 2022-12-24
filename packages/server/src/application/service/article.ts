import { Inject, Service } from 'autoinjection'
import { ArticleRepository } from '@/domain/model/article/repository.js'
import { Article } from '../../domain/model/article/entity.js'
import { Account } from '@/domain/model/account/entity.js'

@Service({ singleton: true })
export class ArticleService {
  // eslint-disable-next-line no-unused-vars
  constructor(@Inject() private readonly articleRepository?: ArticleRepository) {}

  async createArticle(
    dto: {
      title: string,
      description: string,
      uri: string,
      isPublic: boolean,
      account: Account
    },
  ): Promise<Article> {
    const article = Article.new({ ...dto, read: false, accountId: dto.account.id })
    return await this.articleRepository!.save(article)
  }
}
