import { Service } from 'autoinjection'
import { Account } from '~/domain/model/account/entity.js'
import type { AccountRepository } from '~/domain/model/account/repository.js'

@Service({ singleton: true })
class MemoryAccountRepository implements AccountRepository {
  accounts: Array<Account> = []

  async save(account: Account): Promise<Account> {
    const { id } = account

    const index = this.accounts.findIndex((a) => a.id === id)
    if (index === -1) {
      this.accounts.push(account)
    } else {
      this.accounts[index] = account
    }

    return Account.new(account)
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = this.accounts.find((a) => a.email === email)

    return account ? Account.new(account) : null
  }
}

export default MemoryAccountRepository
