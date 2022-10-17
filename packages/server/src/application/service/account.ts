import Account from '../../domain/model/account/entity'
import accountRepository from '../../infrastructure/prisma/repository/account'

async function createAccount({ name, email }: { name: string, email: string }): Promise<Account> {
  const account = Account.new({ name, email })
  return accountRepository.save(account)
}

async function findOrCreaetAccountByEmail(
  { name, email }: { name: string, email: string },
): Promise<Account> {
  const account = await accountRepository.findByEmail(email)
  if (account) {
    return account
  }

  return accountRepository.save(Account.new({ name, email }))
}

export default {
  createAccount,
  findOrCreaetAccountByEmail,
}
