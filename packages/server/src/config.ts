import * as dotenv from 'dotenv'
import { cleanEnv, str } from 'envalid'

dotenv.config()

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'] }),
  GOOGLE_ID: str(),
  GOOGLE_SECRET: str(),
  COOKIE_KEY: str(),
})

export const config = {
  ...env,
  get baseUrl() {
    return this.NODE_ENV === 'production' ? 'https://articler.fly.dev' : 'http://localhost:4000'
  },
}
