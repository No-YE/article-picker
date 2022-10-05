abstract class Entity {
  protected _id: number = -1;

  protected constructor() {}

  get id() {
    return this._id;
  }

  protected set id(value: number) {
    this._id = value;
  }

  static new(_args: unknown) {
    throw Error();
  }
}

export { Entity };
