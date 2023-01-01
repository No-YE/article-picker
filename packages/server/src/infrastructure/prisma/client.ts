/* eslint-disable no-param-reassign */
import * as Prisma from '@prisma/client'

const prismaClient = new Prisma.PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

// prisma soft delete middleware
prismaClient.$use(async (params, next) => {
  if (params.model === 'Article') {
    const deletedAt = new Date()

    if (params.action === 'delete') {
      params.action = 'update'
      params.args.data = { deletedAt }
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany'
      if (params.args.data !== undefined) {
        params.args.data.deletedAt = deletedAt
      } else {
        params.args.data = { deletedAt }
      }
    }
  }
  return next(params)
})

// prisma find without soft deleted middleware
prismaClient.$use(async (params, next) => {
  if (params.model === 'Article') {
    if (params.action === 'findFirst' || params.action === 'findUnique') {
      params.action = 'findFirst'
      params.args.where = { deletedAt: null, ...params.args.where }
    }
    if (params.action === 'findMany') {
      if (params.args.where) {
        if (params.args.where.deleted === undefined) {
          params.args.where.deletedAt = null
        }
      } else {
        params.args.where = { deletedAt: null }
      }
    }
  }
  return next(params)
})

export { Prisma }
export default prismaClient
