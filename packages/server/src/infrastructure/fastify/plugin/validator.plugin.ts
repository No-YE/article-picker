import { type FastifyTypeProvider } from 'fastify'
import fp from 'fastify-plugin'
import yup from 'yup'
import { TypedSchema } from 'yup/lib/util/types.js'

export const validatorPlugin = fp(async (fastify, _opts) => {
  fastify.setValidatorCompiler<yup.AnySchema>(({ schema }) => (data) => {
    try {
      const value = schema.validateSync(data)
      return { value }
    } catch (error) {
      return { error: error as Error }
    }
  })
})

export interface YupTypeProvider extends FastifyTypeProvider {
  output: this['input'] extends TypedSchema ? yup.InferType<this['input']> : never;
}
