import { type FastifyPluginAsync } from 'fastify'
import yup from 'yup'
import { ArticleResolver } from '~/application/read-model/article.js'
import { ArticleService } from '~/application/service/article.js'
import { YupTypeProvider } from '../../plugin/validator.plugin.js'

const articleResolver = new ArticleResolver()
const articleService = new ArticleService()

const articlesRoute: FastifyPluginAsync = async (fastify) => {
  const server = fastify.withTypeProvider<YupTypeProvider>()

  server.get('/new', async (request, reply) => {
    if (!request.user) {
      return reply.redirect('/user/google/signin')
    }

    return reply.view('articles/new')
  })

  server.post(
    '/create',
    {
      schema: {
        body: yup.object({
          title: yup.string().required(),
          description: yup.string().required(),
          uri: yup.string().required(),
          isPublic: yup.boolean().default(false),
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
        isPublic,
        account: request.user,
      })

      return reply.redirect('/articles/my')
    },
  )

  server.get(
    '/my',
    {
      schema: {
        querystring: yup.object({
          title: yup.string(),
          includeRead: yup.boolean().default(false),
        }),
      },
    },
    async (request, reply) => {
      if (!request.user) {
        return reply.redirect('/user/google/signin')
      }

      const { title, includeRead } = request.query
      const articles = await articleResolver.articlesByQuery({
        title: title || undefined,
        includeRead,
        accountId: request.user.id,
      })

      if (request.headers['hx-request'] === 'true' && request.headers['hx-boosted'] !== 'true') {
        return reply.partial('articles/_search', { articles, includeRead })
      }
      return reply.view('articles/my', { articles, title, includeRead })
    },
  )

  server.get(
    '/public',
    {
      schema: {
        querystring: yup.object({
          title: yup.string(),
        }),
      },
    },
    async (request, reply) => {
      const title = request.query.title || undefined
      const articles = await articleResolver.articlesByQuery({
        title,
        isPublic: true,
      })

      if (request.headers['hx-request'] === 'true' && request.headers['hx-boosted'] !== 'true') {
        return reply.partial('articles/_search', { articles })
      }
      return reply.view('articles/public', { articles, title })
    },
  )

  server.get(
    '/random',
    {
      schema: {
        querystring: yup.object({
          title: yup.string(),
          includeRead: yup.boolean().default(false),
        }),
      },
    },
    async (request, reply) => {
      const { title, includeRead } = request.query
      const article = await articleResolver.randomArticleByTitleAndRead({
        title: title || undefined,
        includeRead,
      })
      const articles = article ? [article] : []

      if (request.headers['hx-request'] === 'true' && request.headers['hx-boosted'] !== 'true') {
        return reply.partial('articles/_search', { articles, includeRead })
      }
      return reply.view('articles/random', { articles, title, includeRead })
    },
  )

  fastify.register(import('./show/route.js'), { prefix: '/:id' })
}

export default articlesRoute
