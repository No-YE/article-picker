import fp from 'fastify-plugin'
import view, { type FastifyViewOptions } from '@fastify/view'
import ejs from 'ejs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

declare module 'fastify' {
  interface RouteSpecificOptions {
    layout?: string
  }

  interface FastifyReply {
    view<T extends { [key: string]: any; }>(
      _page: string, _data: T, _opts?: RouteSpecificOptions
    ): FastifyReply;
    view(_page: string, _data?: object, _opts?: RouteSpecificOptions): FastifyReply;
    partial<T extends { [key: string]: any; }>(
      _page: string, _data: T, _opts?: RouteSpecificOptions
    ): FastifyReply;
    partial(_page: string, _data?: object, _opts?: RouteSpecificOptions): FastifyReply;
    locals: { [key: string]: unknown; }
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const options: FastifyViewOptions = {
  engine: { ejs },
  root: join(__dirname, '../', 'views'),
  layout: '_layout.ejs',
}
const partialOptions: FastifyViewOptions = {
  engine: { ejs },
  root: join(__dirname, '../', 'views'),
  propertyName: 'partial',
}

export default fp.default(async (fastify, _opts) => {
  fastify.addHook('preHandler', async (request, reply) => {
    // eslint-disable-next-line no-param-reassign
    reply.locals = {
      user: request.user,
      flash: reply.flash(),
    }
  })

  fastify.register(view, options)
  fastify.register(view, partialOptions)
})
