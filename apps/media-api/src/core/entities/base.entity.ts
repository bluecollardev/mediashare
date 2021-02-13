import { ObjectID, ObjectIdColumn } from 'typeorm';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]> | T[P];
};

export abstract class MSBaseEntity<T> {
  @ObjectIdColumn()
  id: ObjectID;

  constructor(model: Partial<T>) {
    Object.assign(this, model);
  }

  factory(props: Partial<T>): DeepPartial<T> {
    return Object.create(this, props);
  }
}
