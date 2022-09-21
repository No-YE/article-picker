import type { UserModel } from './model';

function findUserById(_id: string) {
  const userModel: UserModel = {
    id: 1,
    name: 'name',
    email: 'email',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return userModel;
}

export { findUserById };
