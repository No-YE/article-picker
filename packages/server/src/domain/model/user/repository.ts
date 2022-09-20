import type UserEntity from './entity.js';

type UserRepository = {
  save(_userEntity: UserEntity): Promise<UserEntity>;
  findByEmail(_email: string): Promise<UserEntity | null>;
}

export default UserRepository;
