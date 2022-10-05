import { Entity } from '../entity';

class User extends Entity {
  private _name!: string;
  private _email!: string;
  private _createdAt!: Date;
  private _updatedAt!: Date;
  private _deletedAt?: Date | null;

  static new({ id, name, email, createdAt, updatedAt }: {
    id?: number,
    name: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date,
  }): User {
    const entity = new this();
    entity.id = id ?? -1;
    entity.name = name;
    entity.email = email;
    entity.createdAt = createdAt ?? new Date('');
    entity.updatedAt = updatedAt ?? new Date('');

    return entity;
  }

  get properties() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    };
  }

  private set name(value: string) {
    if (value.length < 1) throw Error();

    this._name = value;
  }

  private set email(value: string) {
    if (value.length < 1) throw Error();

    this._email = value;
  }

  private set createdAt(value: Date) {
    this._createdAt = value;
  }

  private set updatedAt(value: Date) {
    if (value < this.createdAt) throw Error();

    this._updatedAt = value;
  }
}

export default User;
