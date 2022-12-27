import { type FastifyPluginAsync } from 'fastify'
import yup from 'yup'
import { ArticleResolver } from '../../../../../application/read-model/article.js'
import { ArticleService } from '../../../../../application/service/article.js'
import { YupTypeProvider } from '../../../plugin/validator.plugin.js'

const articleResolver = new ArticleResolver()
const articleService = new ArticleService()

const articlesShowRoute: FastifyPluginAsync = async (fastify) => {
  const server = fastify.withTypeProvider<YupTypeProvider>()

  server.get(
    '/',
    {
      schema: {
        params: yup.object({
          id: yup.number().integer().required(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const article = await articleResolver.getArticleById(id)

      return reply.view('articles/show', { article })
    },
  )

  server.post(
    '/read',
    {
      schema: {
        params: yup.object({
          id: yup.number().integer().required(),
        }),
      },
    },
    async (request, reply) => {
      if (!request.user) {
        return reply.redirect('/user/google/signin')
      }

      const { id } = request.params
      const article = await articleService.readArticle(request.user.id, id)

      return reply.partial('articles/_article', { article })
    },
  )

  server.post(
    '/unread',
    {
      schema: {
        params: yup.object({
          id: yup.number().integer().required(),
        }),
      },
    },
    async (request, reply) => {
      if (!request.user) {
        return reply.redirect('/user/google/signin')
      }

      const { id } = request.params
      const article = await articleService.unreadArticle(request.user.id, id)

      return reply.partial('articles/_article', { article })
    },
  )
}

export default articlesShowRoute
