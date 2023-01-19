import 'reflect-metadata'
import { describe, it, expect, beforeEach } from 'vitest'
import { AccountService } from '~/application/service/account.js'
import AccountRepository from '~/infrastructure/persistence/memory/repository/account.js'

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
    expect(accountRepository.accounts.length).eq(0)

    const account = await accountService.createAccount('name', 'email')
    expect(account.id).not.eq(undefined)
    expect(account.name).eq('name')
    expect(account.email).eq('email')
    expect(accountRepository.accounts.length).eq(1)
  })
})
