import { describe, it, expect } from 'vitest'
import { Account } from '~/domain/model/account/entity'

describe('', () => {
  it('name은 1글자 이상이어야 한다.', () => {
    expect(() => {
      Account.new({ name: 'a', email: 'test@test.com' })
    }).not.toThrowError()

    expect(() => {
      Account.new({ name: '', email: 'test@test.com' })
    }).toThrowError(Error)
  })
})
