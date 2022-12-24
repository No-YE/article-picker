import { Service } from 'autoinjection'
import { D, pipe } from '@mobily/ts-belt'
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
      orderBy: { createdAt: 'desc' },
    })

    return articles.map(this.mapToReadModel)
  }

  async getArticleById(id: number): Promise<Article> {
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
    })

    return this.mapToReadModel(article)
  }

  async getAllByAccountId(accountId: number): Promise<Array<Article>> {
    const articles = await prisma.article.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    })

    return articles.map(this.mapToReadModel)
  }

  async getAllByTitleAndAccountIdAndPublic(
    params: { title?: string, accountId?: number, isPublic?: boolean },
  ): Promise<Array<Article>> {
    const { title, accountId, isPublic } = params

    const whereInput = pipe(
      {} as Prisma.Prisma.ArticleWhereInput,
      (q) => mergeWith(q, { title: { contains: title } }, () => title !== undefined),
      (q) => mergeWith(q, { accountId }, () => accountId !== undefined),
      (q) => mergeWith(q, { isPublic }, () => isPublic !== undefined),
    )

    const articles = await prisma.article.findMany({
      where: whereInput,
      orderBy: { createdAt: 'desc' },
    })

    return articles.map(this.mapToReadModel)
  }

  private mapToReadModel(article: Prisma.Article): Article {
    return D.selectKeys(article, ['id', 'title', 'description', 'imageUri', 'isPublic', 'accountId', 'createdAt'])
  }
}

function mergeWith<T extends object, U extends object>(
  target: T,
  source: U,
  predicate: (_target: T, _source: U) => boolean,
): T {
  if (predicate(target, source)) {
    Object.assign(target, source)
  }
  return target
}