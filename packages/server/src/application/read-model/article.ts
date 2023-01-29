import { Service } from 'autoinjection'
import { D, pipe } from '@mobily/ts-belt'
import prisma, { type Prisma } from '~/infrastructure/persistence/prisma/client.js'

export type Article = {
  id: number
  title: Maybe<string>
  description: Maybe<string>
  imageUri: Maybe<string>
  isPublic: boolean
  accountId: number
  hasRead: boolean
  contentStatus: 'LOADING' | 'LOADED' | 'FAILED' | 'CUSTOMIZED',
  createdAt: Date
}

@Service({ singleton: true })
export class ArticleResolver {
  async publicArticles(): Promise<Array<Article>> {
    const articles = await prisma.article.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
    })

    return articles.map(this.mapToReadModel)
  }

  async articleById(id: number): Promise<Article> {
    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
    })

    return this.mapToReadModel(article)
  }

  async articleByAccontIdAndId(accountId: number, id: number): Promise<Article> {
    const article = await prisma.article.findFirstOrThrow({
      where: { id, accountId },
    })

    return this.mapToReadModel(article)
  }

  async articlesByAccountId(accountId: number): Promise<Array<Article>> {
    const articles = await prisma.article.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    })

    return articles.map(this.mapToReadModel)
  }

  async randomArticleByTitleAndRead(
    params: { title?: string, includeRead: boolean },
  ): Promise<Maybe<Article>> {
    const { title, includeRead } = params
    const query = title === undefined
      ? `SELECT * FROM "Article" ${includeRead ? '' : 'WHERE "readAt" IS NULL'} ORDER BY RANDOM() LIMIT 1;`
      : `SELECT * FROM "Article" WHERE ${includeRead ? '' : '"readAt" IS NULL AND'} title ILIKE $1 ORDER BY RANDOM() LIMIT 1;`

    const articles = await prisma.$queryRawUnsafe<Prisma.Article>(
      query,
      `%${title}%`,
    )
    const article = articles[0]

    return article ? this.mapToReadModel(article) : undefined
  }

  async articlesByQuery(
    params: { title?: string, accountId?: number, isPublic?: boolean, includeRead?: boolean },
  ): Promise<Array<Article>> {
    const { title, accountId, isPublic, includeRead } = params

    const whereInput = pipe(
      {} as Prisma.Prisma.ArticleWhereInput,
      (q) => mergeWith(q, { title: { contains: title, mode: 'insensitive' } }, title !== undefined),
      (q) => mergeWith(q, { accountId }, accountId !== undefined),
      (q) => mergeWith(q, { contentStatus: { in: ['LOADING', 'CUSTOMIZED'] } }, accountId === undefined),
      (q) => mergeWith(q, { isPublic }, isPublic !== undefined),
      (q) => mergeWith(q, { readAt: null }, !includeRead),
    )

    const articles = await prisma.article.findMany({
      where: whereInput,
      orderBy: { createdAt: 'desc' },
    })

    return articles.map(this.mapToReadModel)
  }

  private mapToReadModel(article: Prisma.Article): Article {
    return D.merge(
      D.selectKeys(article, ['id', 'title', 'description', 'uri', 'imageUri', 'isPublic', 'accountId', 'createdAt', 'contentStatus']),
      { hasRead: article.readAt !== undefined && article.readAt !== null },
    )
  }
}

function mergeWith<T extends object>(target: T, source: T, condition: boolean): T {
  if (condition) {
    return D.merge(target, source)
  }
  return target
}
