import fp from 'fastify-plugin'
import cors, { type FastifyCorsOptions } from '@fastify/cors'

const options: FastifyCorsOptions = {
  origin: [/http:\/\/localhost:\d+/],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
}

export default fp.default(async (fastify, _opts) => {
  fastify.register(cors, options)
})
