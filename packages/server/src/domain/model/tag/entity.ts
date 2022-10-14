import { Entity } from '../entity'

export default class Tag extends Entity {
  text!: string

  static new({ id, text }: {
    id?: number,
    text: string,
  }): Tag {
    const entity = new this()
    entity.setId(id ?? -1)
    entity.setText(text)

    return entity
  }

  private setText(value: string): void {
    if (value.length < 1) throw Error()

    this.text = value
  }
}
