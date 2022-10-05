import { Entity } from '../entity';

class Account extends Entity {
  name!: string;
  email!: string;
  private createdAt!: Date;
  private updatedAt!: Date;
  private deletedAt?: Date | null;

  static new({ id, name, email, createdAt, updatedAt }: {
    id?: number,
    name: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date,
  }): Account {
    const entity = new this();
    entity.setId(id ?? -1);
    entity.setName(name);
    entity.setEmail(email);
    entity.setCreatedAt(createdAt ?? new Date(''));
    entity.setUpdatedAt(updatedAt ?? new Date(''));

    return entity;
  }

  private setName(value: string) {
    if (value.length < 1) throw Error();

    this.name = value;
  }

  private setEmail(value: string) {
    if (value.length < 1) throw Error();

    this.email = value;
  }

  private setCreatedAt(value: Date) {
    this.createdAt = value;
  }

  private setUpdatedAt(value: Date) {
    if (value < this.createdAt) throw Error();

    this.updatedAt = value;
  }
}

export default Account;
