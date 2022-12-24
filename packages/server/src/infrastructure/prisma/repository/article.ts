import { Service } from 'autoinjection'
import { D } from '@mobily/ts-belt'
import { Article } from '../../../domain/model/article/entity.js'
import type { ArticleRepository } from '../../../domain/model/article/repository.js'
import prisma, { Prisma } from '../client.js'

@Service({ singleton: true })
class PrismaArticleRepository implements ArticleRepository {
  async findById(id: number): Promise<Article> {
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
    })

    return this.mapToEntity(article)
  }

  async save(article: Article): Promise<Article> {
    const prismaArticle = {
      ...D.selectKeys(article, ['title', 'description', 'uri', 'isPublic', 'accountId']),
      readAt: article.read ? new Date() : null,
    }

    const upsertedAccount = await prisma.article.upsert({
      where: { id: article.id },
      update: prismaArticle,
      create: prismaArticle,
    })

    return this.mapToEntity(upsertedAccount)
  }

  private mapToEntity(article: Prisma.Article): Article {
    return Article.new({ ...article, read: !!article.readAt })
  }
}

export default PrismaArticleRepository
