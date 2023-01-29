import { Factory } from 'fishery'
import { Article } from '~/domain/model/article/entity.js'
import { accountFactory } from '../account/entity.factory.js'

class ArticleFactory extends Factory<Article> {
  loadedContent() {
    const s = this.sequence()
    return this.params({ title: `test${s}`, description: `test${s}`, contentStatus: 'LOADED' })
  }

  failedContent() {
    return this.params({ contentStatus: 'FAILED' })
  }

  customizedContent() {
    const s = this.sequence()
    return this.params({ title: `test${s}`, description: `test${s}`, contentStatus: 'CUSTOMIZED' })
  }
}

export const articleFactory = ArticleFactory.define(
  ({ sequence }) => Article.new({
    id: sequence,
    uri: `test${sequence}`,
    readAt: null,
    isPublic: true,
    accountId: accountFactory.build().id,
    contentStatus: 'LOADING',
  }),
)
