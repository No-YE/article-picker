import type Account from './entity.js';

type AccountRepository = {
  save(_userEntity: Account): Promise<Account>;
  findByEmail(_email: string): Promise<Account | null>;
}

export default AccountRepository;
