import { FastifyPluginAsync } from 'fastify'
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import { ArticleService } from '../../../../application/service/article.js'

const articleService = new ArticleService()

const articlesRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/my', async (request, reply) => {
    if (!request.user) {
      return reply.notFound()
    }

    const articles = await articleService.findByAccountId(request.user.id)
    return reply.view('articles/my', { articles })
  })

  fastify.get('/public', async (_request, reply) => {
    const articles = await articleService.allPublicArticles()
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

      const article = await articleService.findById(id)

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
          public: Type.Optional(Type.Union([Type.Literal('true'), Type.Literal('false')])),
        }),
      },
    },
    async (request, reply) => {
      const { title } = request.body
      const articles = await articleService.findByTitle(title)
      return reply.partial('articles/search', { articles })
    },
  )
}

export default articlesRoute
