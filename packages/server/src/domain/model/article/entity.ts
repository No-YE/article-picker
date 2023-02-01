import { Entity } from '../entity.js'

type CONTENT_STATUS = 'LOADING' | 'LOADED' | 'FAILED' | 'CUSTOMIZED'

export class Article extends Entity {
  title: Maybe<string>
  description: Maybe<string>
  uri!: string
  isPublic!: boolean
  accountId!: number
  imageUri: Maybe<string>
  createdAt!: Date
  readAt: Maybe<Date>
  contentStatus!: CONTENT_STATUS

  static new(
    {
      id,
      title,
      description,
      uri,
      readAt,
      isPublic,
      accountId,
      imageUri,
      contentStatus,
      createdAt,
    }:
      {
        id?: Maybe<number>,
        title?: Maybe<string>,
        description?: Maybe<string>,
        uri: string,
        readAt?: Maybe<Date>,
        isPublic: boolean,
        accountId: number,
        imageUri?: Maybe<string>,
        contentStatus: CONTENT_STATUS,
        createdAt?: Date,
      },
  ): Article {
    const entity = new this()
    entity.contentStatus = contentStatus
    entity.setId(id ?? -1)
    entity.setUri(uri)
    entity.setImageUri(imageUri)
    entity.setTitle(title)
    description && entity.setDescription(description)

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

  loadContent(title: string, description: string, imageUri: Maybe<string>): void {
    if (this.contentStatus !== 'LOADING') throw Error()

    this.contentStatus = 'LOADED'
    !this.title && this.setTitle(title)
    !this.description && this.setDescription(description)
    this.setImageUri(imageUri)
  }

  get hasRead(): boolean {
    return this.readAt !== undefined && this.readAt !== null
  }

  private setTitle(value: Maybe<string>): void {
    if (value === null || value === undefined) {
      if (this.contentStatus === 'CUSTOMIZED') throw Error()
      if (this.contentStatus === 'LOADED') throw Error()
      this.title = null
      return
    }

    if (value.length < 1) throw Error()

    this.title = value
  }

  private setDescription(value: string): void {
    if (value === null || value === undefined) {
      if (this.contentStatus === 'CUSTOMIZED') throw Error()
      if (this.contentStatus === 'LOADED') throw Error()
      this.title = null
      return
    }

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
