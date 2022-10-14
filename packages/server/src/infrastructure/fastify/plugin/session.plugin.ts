import fp from 'fastify-plugin'
import session from '@fastify/session'
import cookie from '@fastify/cookie'

declare module 'fastify' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    accountId?: number;
  }
}

export default fp(async (fastify) => {
  fastify.register(cookie)
  fastify.register(session, {
    secret: 'a secret with minimum length of 32 characters',
    cookie: {
      secure: false,
    },
  })
})
