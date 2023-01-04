import { Entity } from '../entity.js'

export class Article extends Entity {
  title!: string
  description!: string
  uri!: string
  isPublic!: boolean
  accountId!: number
  imageUri: Maybe<string>
  createdAt!: Date
  readAt: Maybe<Date>

  static new(
    { id, title, description, uri, readAt, isPublic, accountId, imageUri, createdAt }:
      {
        id?: Maybe<number>,
        title: string,
        description: string,
        uri: string,
        readAt: Maybe<Date>,
        isPublic: boolean,
        accountId: number,
        imageUri?: Maybe<string>,
        createdAt?: Date,
      },
  ): Article {
    const entity = new this()
    entity.setId(id ?? -1)
    entity.setTitle(title)
    entity.setDescription(description)
    entity.setUri(uri)
    entity.setImageUri(imageUri)

    Object.assign(entity, { readAt, isPublic, accountId, createdAt })

    return entity
  }

  read(value = new Date()): void {
    if (this.readAt !== undefined && this.readAt !== null) {
      throw new Error('Article is already read')
    }

    this.readAt = value
  }

  unread(): void {
    if (this.readAt === undefined || this.readAt === null) {
      throw Error('Article is not read yet')
    }

    this.readAt = null
  }

  get hasRead(): boolean {
    return this.readAt !== undefined && this.readAt !== null
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
      this.imageUri = null
      return
    }

    if (value.length < 1) throw Error()

    this.imageUri = value
  }
}

// class RegisteredTag extends Entity {
//   text!: string
//   articleId!: number

//   static new({ id, text, articleId }: {
//     id?: number,
//     text: string,
//     articleId: number,
//   }): RegisteredTag {
//     const entity = new this()
//     entity.setId(id ?? -1)
//     entity.setText(text)
//     entity.articleId = articleId

//     return entity
//   }

//   private setText(value: string): void {
//     this.text = value
//   }
// }
