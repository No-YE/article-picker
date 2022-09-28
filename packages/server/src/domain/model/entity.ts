abstract class Entity {
  protected _id: number = -1;

  protected constructor() {}

  protected set id(value: number) {
    this._id = value;
  }

  static new(_args: unknown) {
    throw Error();
  }
}

export { Entity };
