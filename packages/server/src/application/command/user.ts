import User from '../../domain/model/user/entity.js';
import prismaUserRepository from '../../infrastructure/prisma/repository/user.js';

type CreateUserDto = {
  name: string;
  email: string;
}

async function createUser(user: CreateUserDto): Promise<User> {
  const userEntity = User.new(user);
  return prismaUserRepository.save(userEntity);
}

export default {
  createUser,
};
