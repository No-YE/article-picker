import fp from 'fastify-plugin'
import fastifyPassport from '@fastify/passport'
import secureSession, { type SecureSessionPluginOptions } from '@fastify/secure-session'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import accountService from '../../../application/service/account'

declare module 'fastify' {
  // eslint-disable-next-line no-unused-vars
  interface PassportUser {
    id: number;
    email: string;
    name: string;
  }
}

const secureSessionPluginOptions: SecureSessionPluginOptions = {
  key: '1234567890123456789012345678901234567890123',
  cookie: {
    path: '/',
    secure: true,
  },
}

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_SECRET as string,
    callbackURL: 'http://localhost:4000/user/google/callback',
    scope: ['email', 'profile'],
  },
  async (_accessToken, _refreshToken, profile, done) => {
    const email = profile.emails?.[0]?.value

    if (email === undefined) {
      done(new Error(), undefined)
      return
    }

    const account = await accountService.findOrCreaetAccountByEmail({
      email,
      name: profile.displayName,
    })
    done(undefined, account)
  },
)

const oauth = fp(async (fastify) => {
  fastify.register(secureSession, secureSessionPluginOptions)
  fastify.register(fastifyPassport.initialize())
  fastify.register(fastifyPassport.secureSession())

  fastifyPassport.use(googleStrategy)

  fastifyPassport.registerUserDeserializer(async (user, _req) => user)
  fastifyPassport.registerUserSerializer(async (user, _req) => user)
})

export default oauth
