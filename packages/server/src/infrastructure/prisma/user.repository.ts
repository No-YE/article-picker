import UserEntity from '../../domain/model/user/user.entity.js';
import type UserRepository from '../../domain/model/user/user.repository.js';
import prisma from './client.js';

async function save(userEntity: UserEntity): Promise<UserEntity> {
  const { name, email } = userEntity;

  const upsertedUser = await prisma.user.upsert({
    where: { id: userEntity.id },
    update: { name, email },
    create: { name, email },
  });

  return upsertedUser;
}

async function findByEmail(email: string): Promise<UserEntity | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user ? new UserEntity(user) : null;
}

const userRepository: UserRepository = {
  save,
  findByEmail,
};

export default userRepository;