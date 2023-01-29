import { describe, it, expect } from 'vitest'
import { Article } from '~/domain/model/article/entity.js'
import { articleFactory } from './entity.factory.js'

describe('constructor', () => {
  describe('contentStatus가 LOADING이나 FAILED이면', () => {
    it('title은 undefined거나 null이어도 된다.', () => {
      expect(() => {
        Article.new({ title: undefined, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADING' })
        Article.new({ title: null, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADING' })
        Article.new({ title: undefined, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'FAILED' })
        Article.new({ title: null, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'FAILED' })
      }).not.toThrowError()
    })

    it('description은 undefined거나 null이어도 된다.', () => {
      expect(() => {
        Article.new({ description: undefined, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADING' })
        Article.new({ description: null, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADING' })
        Article.new({ description: undefined, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'FAILED' })
        Article.new({ description: null, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'FAILED' })
      }).not.toThrowError()
    })
  })

  describe('contentStatus가 LOADED나 CUSTOMIZED이면', () => {
    it('title은 1글자 이상이어야 한다.', () => {
      expect(() => {
        Article.new({ title: 't', uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADED' })
        Article.new({ title: 't', uri: 'test', isPublic: true, accountId: -1, contentStatus: 'CUSTOMIZED' })
      }).not.toThrowError()

      expect(() => {
        Article.new({ title: '', uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADED' })
        Article.new({ title: undefined, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADED' })
        Article.new({ title: null, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADED' })
        Article.new({ title: '', uri: 'test', isPublic: true, accountId: -1, contentStatus: 'CUSTOMIZED' })
        Article.new({ title: undefined, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'CUSTOMIZED' })
        Article.new({ title: null, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'CUSTOMIZED' })
      }).toThrowError(Error)
    })

    it('description은 1글자 이상이어야 한다.', () => {
      expect(() => {
        Article.new({ description: 'd', title: 'test', uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADED' })
        Article.new({ description: 'd', title: 'test', uri: 'test', isPublic: true, accountId: -1, contentStatus: 'CUSTOMIZED' })
      }).not.toThrowError()

      expect(() => {
        Article.new({ description: '', uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADED' })
        Article.new({ description: undefined, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADED' })
        Article.new({ description: null, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADED' })
        Article.new({ description: '', uri: 'test', isPublic: true, accountId: -1, contentStatus: 'CUSTOMIZED' })
        Article.new({ description: undefined, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'CUSTOMIZED' })
        Article.new({ description: null, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'CUSTOMIZED' })
      }).toThrowError(Error)
    })
  })

  it('uri는 1글자 이상이어야 한다.', () => {
    expect(() => {
      Article.new({ uri: 'u', isPublic: true, accountId: -1, contentStatus: 'LOADING' })
    }).not.toThrowError()

    expect(() => {
      Article.new({ uri: '', isPublic: true, accountId: -1, contentStatus: 'LOADING' })
    }).toThrowError(Error)
  })

  it('imageUri는 null이거나 1글자 이상이어야 한다.', () => {
    expect(() => {
      Article.new({ imageUri: null, uri: 'test', isPublic: true, accountId: -1, contentStatus: 'LOADING' })
    }).not.toThrowError()

    expect(() => {
      Article.new({ imageUri: 'i', uri: 'test', readAt: null, isPublic: true, accountId: -1, contentStatus: 'LOADING' })
    }).not.toThrowError()

    expect(() => {
      Article.new({ imageUri: '', uri: 'test', readAt: null, isPublic: true, accountId: -1, contentStatus: 'LOADING' })
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
