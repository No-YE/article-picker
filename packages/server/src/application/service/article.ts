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
    const article = Article.new({ ...dto, readAt: undefined, accountId: dto.account.id })
    return await this.articleRepository!.save(article)
  }

  async updateArticle(
    dto: {
      id: number,
      title: string,
      description: string,
      uri: string,
      isPublic: boolean,
      account: Account
    },
  ): Promise<Article> {
    const existArticle = await this.articleRepository!.findById(dto.account.id, dto.id)
    const newArticle = Article.new({ ...existArticle, ...dto })

    return await this.articleRepository!.save(newArticle)
  }

  async readArticle(accountId: number, articleId: number): Promise<Article> {
    const article = await this.articleRepository!.findById(accountId, articleId)
    article.read()
    return await this.articleRepository!.save(article)
  }

  async unreadArticle(accountId: number, articleId: number): Promise<Article> {
    const article = await this.articleRepository!.findById(accountId, articleId)
    article.unread()
    return await this.articleRepository!.save(article)
  }
}
