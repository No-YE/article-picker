import { Entity } from '../entity';

export default class Article extends Entity {
  title!: string;
  uri!: string;
  read!: boolean;
  userId!: number;

  static new({ id, title, uri, read }: {
    id?: number,
    title: string,
    uri: string,
    read: boolean,
    userId: number,
  }): Article {
    const entity = new this();
    entity.setId(id ?? -1);
    entity.setTitle(title);
    entity.setUri(uri);
    entity.read = read;

    return entity;
  }

  private setTitle(value: string): void {
    if (value.length < 1) throw Error();

    this.title = value;
  }

  private setUri(value: string): void {
    if (value.length < 1) throw Error();

    this.uri = value;
  }
}
