import { Inject, Service } from 'autoinjection'
import { type AccountRepository } from '~/domain/model/account/repository.js'
import { Account } from '~/domain/model/account/entity.js'

@Service({ singleton: true })
export class AccountService {
  // eslint-disable-next-line no-unused-vars
  constructor(@Inject() private readonly accountRepository?: AccountRepository) {}

  async createAccount(name: string, email: string): Promise<Account> {
    const account = Account.new({ name, email })
    return this.accountRepository!.save(account)
  }

  async findOrCreaetAccountByEmail(
    { name, email }: { name: string, email: string },
  ): Promise<Account> {
    const account = await this.accountRepository!.findByEmail(email)
    if (account) {
      return account
    }

    return this.accountRepository!.save(Account.new({ name, email }))
  }
}
