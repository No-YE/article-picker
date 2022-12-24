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

  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
    '/my',
    {
      schema: {
        querystring: Type.Object({
          title: Type.Optional(Type.String()),
        }),
      },
    },
    async (request, reply) => {
      if (!request.user) {
        return reply.redirect('/user/google/signin')
      }

      const title = request.query.title || undefined
      const articles = await articleResolver.getAllByTitleAndAccountIdAndPublic({
        title,
        accountId: request.user.id,
      })

      if (request.headers['hx-request'] === 'true' && request.headers['hx-boosted'] !== 'true') {
        return reply.partial('articles/_search', { articles })
      }
      return reply.view('articles/my', { articles, title })
    },
  )

  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
    '/public',
    {
      schema: {
        querystring: Type.Object({
          title: Type.Optional(Type.String()),
        }),
      },
    },
    async (request, reply) => {
      const title = request.query.title || undefined
      const articles = await articleResolver.getAllByTitleAndAccountIdAndPublic({
        title,
        isPublic: true,
      })

      if (request.headers['hx-request'] === 'true' && request.headers['hx-boosted'] !== 'true') {
        return reply.partial('articles/_search', { articles })
      }
      return reply.view('articles/public', { articles, title })
    },
  )

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
}

export default articlesRoute
