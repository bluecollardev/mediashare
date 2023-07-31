import { AutoMap } from '@automapper/classes';
import { ObjectId } from 'bson';
import { ObjectIdColumn, Entity, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ApiDecoratorOptions, ApiObjectId, ApiPastDate } from '@mediashare/shared';
import { IdType } from '@mediashare/shared';

export interface ApiBaseEntityInterface {
  _id: IdType;
}

export abstract class DataProviderBaseEntity<M> implements ApiBaseEntityInterface {
  @ObjectIdColumn()
  _id: ObjectId | string;

  // TODO: Do we need to update this?
  //  The constructor part needs to be looked at
  //  and removed if unnecessary
  protected constructor(model?: Partial<M>) {
    Object.assign(this, model);
  }
}

@Entity()
export class ApiBaseEntity implements ApiBaseEntityInterface {
  @AutoMap()
  @ObjectIdColumn()
  @ApiObjectId(<ApiDecoratorOptions>{ readOnly: true })
  _id: ObjectId;

  @AutoMap()
  @Column()
  @ApiObjectId()
  readonly createdBy?: Readonly<ObjectId>;

  @AutoMap()
  @CreateDateColumn()
  @ApiProperty({ readOnly: true, type: Date, required: true })
  readonly createdAt?: Date;

  @AutoMap()
  @UpdateDateColumn()
  @ApiPastDate(<ApiDecoratorOptions>{ readOnly: true, type: Date, required: false })
  readonly updatedDate?: Date;
}
