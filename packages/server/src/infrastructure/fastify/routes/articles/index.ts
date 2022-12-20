import { FastifyPluginAsync } from 'fastify'
import { ArticleService } from '../../../../application/service/article'

const articleService = new ArticleService()

const articles: FastifyPluginAsync = async (fastify) => {
  fastify.get('/public', async (_request, reply) => {
    const publicArticles = await articleService.allPublicArticles()
    return reply.view('articles/public', { articles: publicArticles })
  })
}

export default articles
