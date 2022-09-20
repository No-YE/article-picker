// import { fileURLToPath } from 'url';
import { join } from 'path';
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';

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

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugin'),
    options: opts,
  });

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    ignorePattern: /.*(test|spec).js/,
    options: opts,
  });

  // fastify.register(AutoLoad, {
  //   dir: join(__dirname, 'routes'),
  //   options: opts,
  // });
};

export { app };