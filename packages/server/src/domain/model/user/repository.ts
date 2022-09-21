import type User from './entity.js';

type UserRepository = {
  save(_userEntity: User): Promise<User>;
  findByEmail(_email: string): Promise<User | null>;
}

export default UserRepository;
