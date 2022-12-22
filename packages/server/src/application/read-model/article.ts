import { Service } from 'autoinjection'
import pick from 'object.pick'
import prisma, { Prisma } from '../../infrastructure/prisma/client.js'

export type Article = {
  id: number
  title: string
  description: string
  imageUri: Maybe<string>
  isPublic: boolean
  accountId: number
}

@Service({ singleton: true })
export class ArticleResolver {
  async allPublicArticles(): Promise<Array<Article>> {
    const articles = await prisma.article.findMany({
      where: { isPublic: true },
    })

    return articles.map(this.mapToReadModel)
  }

  async getArticleById(id: number): Promise<Article> {
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
    })

    return this.mapToReadModel(article)
  }

  async getByAccountId(accountId: number): Promise<Array<Article>> {
    const articles = await prisma.article.findMany({
      where: { accountId },
    })

    return articles.map(this.mapToReadModel)
  }

  async getArticleByTitle(title: string): Promise<Array<Article>> {
    const articles = await prisma.article.findMany({
      where: {
        title: { contains: title },
      },
    })

    return articles.map(this.mapToReadModel)
  }

  private mapToReadModel(article: Prisma.Article): Article {
    return pick(article, ['id', 'title', 'description', 'imageUri', 'isPublic', 'accountId'])
  }
}
