class UserEntity {
  id?: number;
  name!: string;
  email!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  static new(param: UserEntity): UserEntity {
    const userEntity = new this(param);

    if (userEntity.name.length < 1) {
      throw Error('');
    }

    if (userEntity.email.length < 1) {
      throw Error('');
    }

    return userEntity;
  }

  private constructor(param: UserEntity) {
    Object.assign(this, param);
  }
}

export default UserEntity;
