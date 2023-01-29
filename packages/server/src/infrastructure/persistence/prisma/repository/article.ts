import { Service } from 'autoinjection'
import { D } from '@mobily/ts-belt'
import { Article } from '~/domain/model/article/entity.js'
import type { ArticleRepository } from '~/domain/model/article/repository.js'
import prisma, { type Prisma } from '../client.js'

@Service({ singleton: true })
class PrismaArticleRepository implements ArticleRepository {
  async findById(accountId: number, articleId: number): Promise<Article> {
    const article = await prisma.article.findFirstOrThrow({
      where: {
        accountId,
        id: articleId,
      },
    })

    return this.mapToEntity(article)
  }

  async save(article: Article): Promise<Article> {
    const prismaArticle = {
      ...D.selectKeys(article, ['title', 'description', 'uri', 'isPublic', 'accountId', 'readAt', 'contentStatus']),
    }

    const upsertedAccount = await prisma.article.upsert({
      where: { id: article.id },
      update: prismaArticle,
      create: prismaArticle,
    })

    return this.mapToEntity(upsertedAccount)
  }

  async delete(article: Article): Promise<void> {
    await prisma.article.delete({
      where: { id: article.id },
    })
  }

  private mapToEntity(article: Prisma.Article): Article {
    return Article.new(article)
  }
}

export default PrismaArticleRepository
