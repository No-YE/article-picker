import { Service } from 'autoinjection'
import { Account } from '~/domain/model/account/entity.js'
import type { AccountRepository } from '~/domain/model/account/repository.js'
import prisma from '../client.js'

@Service({ singleton: true })
class PrismaAccountRepository implements AccountRepository {
  async save(account: Account): Promise<Account> {
    const { id, name, email } = account

    const upsertedAccount = await prisma.account.upsert({
      where: { id },
      update: { name, email },
      create: { name, email },
    })

    return Account.new(upsertedAccount)
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = await prisma.account.findUnique({
      where: { email },
    })

    return account ? Account.new(account) : null
  }
}

export default PrismaAccountRepository
