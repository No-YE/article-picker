import { describe, it, expect } from 'vitest'
import { Article } from '~/domain/model/article/entity.js'
import { articleFactory } from './entity.factory.js'

describe('constructor', () => {
  it('title은 1글자 이상이어야 한다.', () => {
    expect(() => {
      Article.new({ title: 't', description: 'test', uri: 'test', readAt: null, isPublic: true, accountId: -1 })
    }).not.toThrowError()

    expect(() => {
      Article.new({ title: '', description: 'test', uri: 'test', readAt: null, isPublic: true, accountId: -1 })
    }).toThrowError(Error)
  })

  it('description은 1글자 이상이어야 한다.', () => {
    expect(() => {
      Article.new({ description: 'd', title: 'test', uri: 'test', readAt: null, isPublic: true, accountId: -1 })
    }).not.toThrowError()

    expect(() => {
      Article.new({ description: '', title: 'test', uri: 'test', readAt: null, isPublic: true, accountId: -1 })
    }).toThrowError(Error)
  })

  it('uri는 1글자 이상이어야 한다.', () => {
    expect(() => {
      Article.new({ uri: 'u', title: 'test', description: 'test', readAt: null, isPublic: true, accountId: -1 })
    }).not.toThrowError()

    expect(() => {
      Article.new({ uri: '', title: 'test', description: 'test', readAt: null, isPublic: true, accountId: -1 })
    }).toThrowError(Error)
  })

  it('imageUri는 null이거나 1글자 이상이어야 한다.', () => {
    expect(() => {
      Article.new({ imageUri: null, title: 'test', description: 'test', uri: 'test', readAt: null, isPublic: true, accountId: -1 })
    }).not.toThrowError()

    expect(() => {
      Article.new({ imageUri: 'i', title: 'test', description: 'test', uri: 'test', readAt: null, isPublic: true, accountId: -1 })
    }).not.toThrowError()

    expect(() => {
      Article.new({ imageUri: '', title: 'test', description: 'test', uri: 'test', readAt: null, isPublic: true, accountId: -1 })
    }).toThrowError(Error)
  })
})

describe('read', () => {
  it('readAt이 null이면 현재 시간으로 설정한다.', () => {
    const article = articleFactory.build({ readAt: null })
    const readAt = new Date()

    expect(() => article.read(readAt)).not.toThrowError()
    expect(article.readAt).toEqual(readAt)
  })

  it('readAt이 null이 아니면 에러를 던진다.', () => {
    const article = articleFactory.build({ readAt: new Date() })

    expect(() => article.read()).toThrowError(Error)
  })
})

describe('unread', () => {
  it('readAt이 null이 아니면 null로 설정한다.', () => {
    const article = articleFactory.build({ readAt: new Date() })

    expect(() => article.unread()).not.toThrowError()
    expect(article.readAt).toBeNull()
  })

  it('readAt이 null이면 에러를 던진다.', () => {
    const article = articleFactory.build({ readAt: null })

    expect(() => article.unread()).toThrowError('Article is not read yet')
  })
})

describe('hasRead', () => {
  it('readAt이 null이면 false를 반환한다.', () => {
    const article = articleFactory.build({ readAt: null })

    expect(article.hasRead).toBe(false)
  })

  it('readAt이 null이 아니면 true를 반환한다.', () => {
    const article = articleFactory.build({ readAt: new Date() })

    expect(article.hasRead).toBe(true)
  })
})
