import { AutoMap } from '@automapper/classes';
import { AutoMapOptions } from '@automapper/classes/lib/automap';
import { ObjectIdColumn, Entity, CreateDateColumn, UpdateDateColumn, ColumnOptions } from 'typeorm';
import { ObjectId } from 'mongodb';

export interface IApiBaseEntity {
  _id: ObjectId;
}

export abstract class DataProviderBaseEntity<M> implements IApiBaseEntity {
  @AutoMap()
  @ObjectIdColumn()
  _id: ObjectId;

  // TODO: Do we need to update this?
  //  The constructor part needs to be looked at!
  //  Remove if unnecessary...
  protected constructor(model?: Partial<M>) {
    Object.assign(this, model);
  }
}

@Entity()
export class ApiBaseEntity implements IApiBaseEntity {
  @AutoMap({ typeFn: () => ObjectId } as AutoMapOptions)
  @ObjectIdColumn()
  _id: ObjectId;

  // @AutoMap({ typeFn: () => ObjectId } as AutoMapOptions)
  // @ObjectIdColumn()
  // createdBy: ObjectId;

  @AutoMap()
  @CreateDateColumn()
  readonly createdAt: Date;

  @AutoMap()
  @UpdateDateColumn(<ColumnOptions>{ required: false })
  readonly updatedDate: Date;
}
