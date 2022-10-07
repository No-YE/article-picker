import { Entity } from '../entity';

class Account extends Entity {
  name!: string;
  email!: string;

  static new({ id, name, email }: {
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
}

export default Account;
