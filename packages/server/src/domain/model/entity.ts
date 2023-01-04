abstract class Entity {
  id: number = -1

  protected constructor() {}

  protected setId(value: number) {
    this.id = value
  }
}

export { Entity }
