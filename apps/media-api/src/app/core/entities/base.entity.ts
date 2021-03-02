import { ObjectId } from 'bson';
import { ObjectIdColumn } from 'typeorm';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]> | T[P];
};

export abstract class BcBaseEntity<M> {
  @ObjectIdColumn()
  _id: ObjectId;

  constructor(model?: Partial<M>) {
    Object.assign(this, model);
  }
}
