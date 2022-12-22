import { Service } from 'autoinjection'
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

  private mapToEntity(article: Prisma.Article): Article {
    return Article.new({ ...article, read: !!article.readAt })
  }
}

export default PrismaArticleRepository
