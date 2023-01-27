import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { AccountService } from '~/application/service/account.js'
import AccountRepository from '~/infrastructure/persistence/memory/repository/account.js'
import { accountFactory } from '../../model/account/entity.factory.js'

declare module 'vitest' {
  export interface TestContext {
    accountService: AccountService
    accountRepository: AccountRepository
  }
}

beforeEach((context) => {
  context.accountRepository = new AccountRepository()
  context.accountService = new AccountService(context.accountRepository)
})

describe('createAccount', () => {
  it('account가 생성된다.', async ({ accountRepository, accountService }) => {
    const oldAccountLength = accountRepository.accounts.length

    const account = await accountService.createAccount('name', 'email')

    expect(account.id).not.eq(undefined)
    expect(account.name).eq('name')
    expect(account.email).eq('email')
    expect(accountRepository.accounts.length).eq(oldAccountLength + 1)
  })
})

describe('findOrCreateAccountByEmail', () => {
  it('주어진 email을 가지고 있는 account가 없으면 새로 생성된다.', async ({ accountRepository, accountService }) => {
    const oldAccountLength = accountRepository.accounts.length

    const account = await accountService.findOrCreaetAccountByEmail({
      name: 'name',
      email: 'email',
    })

    expect(account.id).not.toEqual(undefined)
    expect(account.name).eq('name')
    expect(account.email).eq('email')
    expect(accountRepository.accounts.length).eq(oldAccountLength + 1)
  })

  it('주어진 email을 가지고 있는 account가 존재하면 해당 account가 반환된다.', async ({ accountRepository, accountService }) => {
    const account = await accountRepository.save(accountFactory.build({ email: 'email' }))
    const oldAccountLength = accountRepository.accounts.length

    const foundAccount = await accountService.findOrCreaetAccountByEmail({
      name: 'name2',
      email: 'email',
    })

    expect(foundAccount).toEqual(account)
    expect(accountRepository.accounts.length).eq(oldAccountLength)
  })
})
