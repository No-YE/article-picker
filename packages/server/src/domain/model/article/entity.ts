import { Entity } from '../entity'

export default class Article extends Entity {
  title!: string
  uri!: string
  read!: boolean
  userId!: number
  tags!: Array<RegisteredTag>

  static new({ id, title, uri, read, tags }: {
    id?: number,
    title: string,
    uri: string,
    read: boolean,
    userId: number,
    tags?: Array<RegisteredTag>,
  }): Article {
    const entity = new this()
    entity.setId(id ?? -1)
    entity.setTitle(title)
    entity.setUri(uri)
    entity.read = read
    entity.tags = tags ?? []

    return entity
  }

  private setTitle(value: string): void {
    if (value.length < 1) throw Error()

    this.title = value
  }

  private setUri(value: string): void {
    if (value.length < 1) throw Error()

    this.uri = value
  }
}

class RegisteredTag extends Entity {
  text!: string
  articleId!: number

  static new({ id, text, articleId }: {
    id?: number,
    text: string,
    articleId: number,
  }): RegisteredTag {
    const entity = new this()
    entity.setId(id ?? -1)
    entity.setText(text)
    entity.articleId = articleId

    return entity
  }

  private setText(value: string): void {
    this.text = value
  }
}
