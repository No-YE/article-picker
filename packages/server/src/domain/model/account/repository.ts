import { type Account } from './entity.js'

export interface AccountRepository {
  save(_userEntity: Account): Promise<Account>;
  findByEmail(_email: string): Promise<Account | null>;
}
