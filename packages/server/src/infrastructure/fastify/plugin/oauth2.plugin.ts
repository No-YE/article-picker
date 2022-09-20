import fp from 'fastify-plugin';
import oauthPlugin from '@fastify/oauth2';
import type { OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
  // eslint-disable-next-line no-unused-vars
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}

const oauth = fp(async (fastify) => {
  fastify.register(oauthPlugin, {
    name: 'googleOAuth2',
    scope: ['email profile'],
    credentials: {
      client: {
        id: process.env.GOOGLE_ID as string,
        secret: process.env.GOOGLE_SECRET as string,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/user/login/google',
    callbackUri: 'http://localhost:3000/user/login/google/callback',
  });
});

export default oauth;
