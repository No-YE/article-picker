import { Entity } from '../entity.js'

export class Article extends Entity {
  title!: string
  description!: string
  uri!: string
  read!: boolean
  isPublic!: boolean
  accountId!: number
  tags!: Array<RegisteredTag>
  imageUri?: string
  createdAt!: Date

  static new(
    { id, title, description, uri, read, isPublic, accountId, tags, imageUri, createdAt }:
      {
        id: Maybe<number>,
        title: string,
        description: string,
        uri: string,
        read: boolean,
        isPublic: boolean,
        accountId: number,
        imageUri: Maybe<string>,
        tags?: Array<RegisteredTag>,
        createdAt: Date,
      },
  ): Article {
    const entity = new this()
    entity.setId(id ?? -1)
    entity.setTitle(title)
    entity.setDescription(description)
    entity.setUri(uri)
    entity.setImageUri(imageUri)

    Object.assign(entity, { read, isPublic, accountId, createdAt, tags: tags ?? [] })

    return entity
  }

  private setTitle(value: string): void {
    if (value.length < 1) throw Error()

    this.title = value
  }

  private setDescription(value: string): void {
    if (value.length < 1) throw Error()

    this.description = value
  }

  private setUri(value: string): void {
    if (value.length < 1) throw Error()

    this.uri = value
  }

  private setImageUri(value: Maybe<string>): void {
    if (value === undefined || value === null) {
      this.imageUri = undefined
      return
    }

    if (value.length < 1) throw Error()

    this.imageUri = value
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
