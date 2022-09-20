import UserEntity from '../domain/model/user/entity.js';
import prismaUserRepository from '../infrastructure/prisma/repository/user.js';

type User = {
  name: string;
  email: string;
}

async function createUser(user: User): Promise<UserEntity> {
  const userEntity = new UserEntity(user);
  return prismaUserRepository.save(userEntity);
}

export default {
  createUser,
};
