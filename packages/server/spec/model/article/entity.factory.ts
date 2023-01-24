import { Factory } from 'fishery'
import { Article } from '~/domain/model/article/entity.js'
import { accountFactory } from '../account/entity.factory.js'

export const articleFactory = Factory.define<Article>(
  ({ sequence }) => Article.new({
    id: sequence,
    title: `test${sequence}`,
    description: `test${sequence}`,
    uri: `test${sequence}`,
    readAt: null,
    isPublic: true,
    accountId: accountFactory.build().id,
  }),
)
