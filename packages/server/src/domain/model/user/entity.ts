class User {
  id?: number;
  name!: string;
  email!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  static new(param: User): User {
    const userEntity = new this(param);

    if (userEntity.name.length < 1) {
      throw Error('');
    }

    if (userEntity.email.length < 1) {
      throw Error('');
    }

    return userEntity;
  }

  private constructor(param: User) {
    Object.assign(this, param);
  }
}

export default User;
