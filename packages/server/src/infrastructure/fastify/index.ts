// import { fileURLToPath } from 'url';
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { FastifyPluginAsync } from 'fastify'
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'
import formbody from '@fastify/formbody'
import { TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox'
import '../prisma/repository/index.js'

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  // const __dirname = dirname(fileURLToPath(import.meta.url));
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  // This loads all plugins defined in routes
  // define your routes in one of these

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  fastify.setValidatorCompiler(TypeBoxValidatorCompiler)

  fastify.addHook('preHandler', async (request) => {
    if (request.body) {
      request.log.info({ body: request.body })
    }
  })

  fastify.register(formbody)

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugin'),
    options: opts,
  })

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    ignorePattern: /.*(test|spec).js/,
    options: opts,
  })

  // fastify.register(AutoLoad, {
  //   dir: join(__dirname, 'routes'),
  //   options: opts,
  // });
}

export { app }
