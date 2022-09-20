class UserEntity {
  id?: number;
  name!: string;
  email!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  constructor(param: UserEntity) {
    Object.assign(this, param);
  }
}

export default UserEntity;
