import fp from 'fastify-plugin'
import view, { type FastifyViewOptions } from '@fastify/view'
import ejs from 'ejs'
import path from 'path'

declare module 'fastify' {
  interface RouteSpecificOptions {
    layout?: string
  }

  interface FastifyReply {
    view<T extends { [key: string]: any; }>(
      _page: string, _data: T, _opts?: RouteSpecificOptions
    ): FastifyReply;
    view(_page: string, _data?: object, _opts?: RouteSpecificOptions): FastifyReply;
  }
}

const options: FastifyViewOptions = {
  engine: { ejs },
  root: path.join(__dirname, '../', 'views'),
  templates: './_layout.ejs',
}

export default fp(async (fastify, _opts) => {
  fastify.register(view, options)
})
