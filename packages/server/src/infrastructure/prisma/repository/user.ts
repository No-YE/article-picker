import User from '../../../domain/model/user/entity.js';
import type UserRepository from '../../../domain/model/user/repository.js';
import prisma from '../client.js';

async function save(user: User): Promise<User> {
  const { id, name, email } = user.properties;

  const upsertedUser = await prisma.user.upsert({
    where: { id },
    update: { name, email },
    create: { name, email },
  });

  return User.new(upsertedUser);
}

async function findByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user ? User.new(user) : null;
}

const userRepository: UserRepository = {
  save,
  findByEmail,
};

export default userRepository;
