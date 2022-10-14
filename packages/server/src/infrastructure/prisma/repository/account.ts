import Account from '../../../domain/model/account/entity.js'
import type AccountRepository from '../../../domain/model/account/repository.js'
import prisma from '../client.js'

async function save(account: Account): Promise<Account> {
  const { id, name, email } = account

  const upsertedAccount = await prisma.account.upsert({
    where: { id },
    update: { name, email },
    create: { name, email },
  })

  return Account.new(upsertedAccount)
}

async function findByEmail(email: string): Promise<Account | null> {
  const account = await prisma.account.findUnique({
    where: { email },
  })

  return account ? Account.new(account) : null
}

const accountRepository: AccountRepository = {
  save,
  findByEmail,
}

export default accountRepository
