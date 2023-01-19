import { describe, it, expect } from 'vitest'
import { Account } from '~/domain/model/account/entity.js'

describe('constructor', () => {
  it('name은 1글자 이상이어야 한다.', () => {
    expect(() => {
      Account.new({ name: 'a', email: 'test@test.com' })
    }).not.toThrowError()

    expect(() => {
      Account.new({ name: '', email: 'test@test.com' })
    }).toThrowError(Error)
  })

  it('email은 1글자 이상이어야 한다.', () => {
    expect(() => {
      Account.new({ name: 'test', email: 't' })
    }).not.toThrowError()

    expect(() => {
      Account.new({ name: 'test', email: '' })
    }).toThrowError(Error)
  })
})
