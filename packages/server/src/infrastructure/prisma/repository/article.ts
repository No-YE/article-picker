import { Service } from 'autoinjection'
import { Article } from '../../../domain/model/article/entity.js'
import type { ArticleRepository } from '../../../domain/model/article/repository.js'
import prisma from '../client.js'

@Service({ singleton: true })
class PrismaArticleRepository implements ArticleRepository {
  async allPublicArticles(): Promise<Array<Article>> {
    const articles = await prisma.article.findMany({
      where: { isPublic: true },
    })

    return articles.map((article) => Article.new({ ...article, read: !!article.readAt }))
  }
}

export default PrismaArticleRepository
