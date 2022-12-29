import fp from 'fastify-plugin'
import fastifyPassport from '@fastify/passport'
import secureSession, { type SecureSessionPluginOptions } from '@fastify/secure-session'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { AccountService } from '../../../application/service/account.js'
import { type Account } from '@/domain/model/account/entity.js'

declare module 'fastify' {
  // eslint-disable-next-line no-unused-vars
  interface PassportUser extends Account {}
}

const secureSessionPluginOptions: SecureSessionPluginOptions = {
  key: '1234567890123456789012345678901234567890123',
  cookie: {
    path: '/',
    secure: true,
  },
}

const CALLBACK_URL = process.env.NODE_ENV === 'production' ? 'https://articler.fly.dev' : 'http://localhost:4000'

const accountService = new AccountService()

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_SECRET as string,
    callbackURL: `${CALLBACK_URL}/user/google/callback`,
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

export default fp.default(async (fastify) => {
  fastify.register(secureSession, secureSessionPluginOptions)
  fastify.register(fastifyPassport.default.initialize())
  fastify.register(fastifyPassport.default.secureSession())

  fastifyPassport.default.use(googleStrategy)

  fastifyPassport.default.registerUserDeserializer(async (user, _req) => user)
  fastifyPassport.default.registerUserSerializer(async (user, _req) => user)
})
