import { FastifyPluginAsync } from 'fastify'
import { type TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import { ArticleService } from '../../../../application/service/article'

const articleService = new ArticleService()

const articles: FastifyPluginAsync = async (fastify) => {
  fastify.get('/public', async (_request, reply) => {
    const publicArticles = await articleService.allPublicArticles()
    return reply.view('articles/public', { articles: publicArticles })
  })

  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
    '/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.Integer(),
        }),
      },
    },
    async (request, reply) => {
      const article = await articleService.findById(request.params.id)
      return reply.view('articles/show', { article })
    },
  )
}

export default articles
