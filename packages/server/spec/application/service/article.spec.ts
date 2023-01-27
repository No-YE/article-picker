import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { articleFactory } from 'spec/model/article/entity.factory.js'
import { accountFactory } from 'spec/model/account/entity.factory.js'
import { ArticleService } from '~/application/service/article.js'
import ArticleRepository from '~/infrastructure/persistence/memory/repository/article.js'

const account = accountFactory.build()

declare module 'vitest' {
  export interface TestContext {
    articleService: ArticleService
    articleRepository: ArticleRepository
  }
}

beforeEach((context) => {
  context.articleRepository = new ArticleRepository()
  context.articleService = new ArticleService(context.articleRepository)
})

describe('createArticle', () => {
  it('article이 생성된다.', async ({ articleRepository, articleService }) => {
    const oldArticleLength = articleRepository.articles.length
    const article = await articleService.createArticle({
      title: 'title',
      description: 'description',
      uri: 'uri',
      isPublic: true,
      account,
    })

    expect(article.id).not.eq(undefined)
    expect(article.title).eq('title')
    expect(article.description).eq('description')
    expect(article.uri).eq('uri')
    expect(article.isPublic).eq(true)
    expect(article.accountId).eq(account.id)
    expect(articleRepository.articles.length).eq(oldArticleLength + 1)
  })
})

describe('updateArticle', () => {
  it('article이 수정된다.', async ({ articleRepository, articleService }) => {
    const article = await articleRepository.save(articleFactory.build({
      title: 'title',
      description: 'description',
      uri: 'uri',
      isPublic: true,
      accountId: account.id,
    }))

    const updatedArticle = await articleService.updateArticle({
      id: article.id,
      title: 'title2',
      description: 'description2',
      uri: 'uri2',
      isPublic: false,
      account,
    })

    expect(updatedArticle.id).eq(article.id)
    expect(updatedArticle.title).eq('title2')
    expect(updatedArticle.description).eq('description2')
    expect(updatedArticle.uri).eq('uri2')
    expect(updatedArticle.isPublic).eq(false)
    expect(updatedArticle.accountId).eq(account.id)
  })
})

describe('deleteArticle', () => {
  it('article이 삭제된다.', async ({ articleRepository, articleService }) => {
    const article = await articleRepository.save(articleFactory.build({ accountId: account.id }))
    const oldArticleLength = articleRepository.articles.length

    await articleService.deleteArticle(account.id, article.id)

    expect(articleRepository.articles.length).eq(oldArticleLength - 1)
  })
})

describe('readArticle', () => {
  it('article이 읽음으로 변경된다.', async ({ articleRepository, articleService }) => {
    const article = await articleRepository.save(articleFactory.build({ accountId: account.id }))

    const readArticle = await articleService.readArticle(account.id, article.id)

    expect(readArticle.readAt).not.eq(null)
    expect(readArticle.readAt).not.eq(undefined)
  })
})

describe('unreadArticle', () => {
  it('article이 읽지 않음으로 변경된다.', async ({ articleRepository, articleService }) => {
    const article = await articleRepository.save(articleFactory.build({ accountId: account.id }))
    const readArticle = await articleService.readArticle(account.id, article.id)

    const unreadArticle = await articleService.unreadArticle(account.id, readArticle.id)

    expect(unreadArticle.readAt).eq(null)
  })
})
