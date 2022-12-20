import * as Prisma from 'my-prisma'

const prismaClient = new Prisma.PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

export { Prisma }
export default prismaClient
