import { type FastifyPluginAsync } from 'fastify'
import yup from 'yup'
import { ArticleResolver } from '../../../../application/read-model/article.js'
import { ArticleService } from '../../../../application/service/article.js'
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
          isPublic: yup.boolean().required(),
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

  server.get(
    '/random',
    {
      schema: {
        querystring: yup.object({
          title: yup.string(),
        }),
      },
    },
    async (request, reply) => {
      const title = request.query.title || undefined
      const article = await articleResolver.getRandomArticleByTitle(title)

      if (request.headers['hx-request'] === 'true' && request.headers['hx-boosted'] !== 'true') {
        return reply.partial('articles/_search', { articles: [article] })
      }
      return reply.view('articles/random', { articles: [article], title })
    },
  )

  server.get(
    '/:id',
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
}

export default articlesRoute
