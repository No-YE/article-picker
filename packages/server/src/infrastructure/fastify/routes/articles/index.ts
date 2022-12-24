import { FastifyPluginAsync } from 'fastify'
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import { ArticleResolver } from '../../../../application/read-model/article.js'
import { ArticleService } from '../../../../application/service/article.js'

const articleResolver = new ArticleResolver()
const articleService = new ArticleService()

const articlesRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/new', async (request, reply) => {
    if (!request.user) {
      return reply.redirect('/user/google/signin')
    }

    return reply.view('articles/new')
  })

  fastify.withTypeProvider<TypeBoxTypeProvider>().post(
    '/create',
    {
      schema: {
        body: Type.Object({
          title: Type.String(),
          description: Type.String(),
          uri: Type.String(),
          isPublic: Type.Union([Type.Boolean(), Type.Literal('true'), Type.Literal('false')]),
        }),
      },
    },
    async (request, reply) => {
      if (!request.user) {
        return reply.redirect('/user/google/signin')
      }

      const { title, description, uri, isPublic } = request.body

      await articleService.createArticle({
        title,
        description,
        uri,
        isPublic: isPublic === 'true' || isPublic === true,
        account: request.user,
      })

      return reply.redirect('/articles/my')
    },
  )

  fastify.get('/my', async (request, reply) => {
    if (!request.user) {
      return reply.redirect('/user/google/signin')
    }

    const articles = await articleResolver.getAllByAccountId(request.user!.id)
    return reply.view('articles/my', { articles })
  })

  fastify.get('/public', async (_request, reply) => {
    const articles = await articleResolver.allPublicArticles()
    return reply.view('articles/public', { articles })
  })

  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
    '/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.String(),
        }),
      },
    },
    async (request, reply) => {
      const id = parseInt(request.params.id, 10)
      if (Number.isNaN(id)) {
        return reply.notFound()
      }

      const article = await articleResolver.getArticleById(id)

      return reply.view('articles/show', { article })
    },
  )

  fastify.withTypeProvider<TypeBoxTypeProvider>().post(
    '/search',
    {
      schema: {
        body: Type.Object({
          title: Type.String(),
          my: Type.Optional(Type.Union([Type.Literal('true'), Type.Literal('false')])),
          isPublic: Type.Optional(Type.Union([Type.Boolean(), Type.Literal('true'), Type.Literal('false')])),
        }),
      },
    },
    async (request, reply) => {
      const { title, my, isPublic } = request.body
      const articles = await articleResolver.getAllByTitleAndAccountIdAndPublic({
        title,
        isPublic: isPublic === undefined ? undefined : isPublic === 'true' || isPublic === true,
        accountId: my ? request.user?.id : undefined,
      })

      return reply.partial('articles/search', { articles })
    },
  )
}

export default articlesRoute
