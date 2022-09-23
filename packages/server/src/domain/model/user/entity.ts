import { Entity } from '../entity';

class User extends Entity {
  private name!: string;
  private email!: string;
  private createdAt!: Date;
  private updatedAt!: Date;
  private deletedAt?: Date | null;

  static new(param: {
    id?: number,
    name: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date,
  }): User {
    const entity = new this();
    Object.assign(entity, { id: -1, createdAt: -1, updatedAt: -1 }, param);

    return entity;
  }

  get properties() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}

export default User;
