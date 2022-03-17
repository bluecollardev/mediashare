import { ObjectId } from 'bson';
import { ObjectIdColumn, Entity, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BcBaseInterface } from '@core-lib';
import { ApiDecoratorOptions, ApiObjectId, ApiPastDate } from '@mediashare/shared';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]> | T[P];
};

export abstract class BcBaseEntity<M> implements BcBaseInterface {
  @ObjectIdColumn()
  _id: ObjectId | string;

  constructor(model?: Partial<M>) {
    Object.assign(this, model);
  }
}

@Entity()
export class BcEntity implements BcBaseInterface {
  @ObjectIdColumn()
  @ApiObjectId(<ApiDecoratorOptions>{ readOnly: true })
  _id: ObjectId;

  @CreateDateColumn()
  @ApiProperty({ readOnly: true, type: Date })
  readonly createdAt?: Date;

  @UpdateDateColumn()
  @ApiPastDate(<ApiDecoratorOptions>{ readOnly: true, type: Date, required: false })
  readonly updatedDate?: Date;

  @Column()
  @ApiObjectId(<ApiDecoratorOptions>{
    description: ''
  })
  readonly createdBy?: Readonly<ObjectId>;

  @Column()
  @ApiObjectId(<ApiDecoratorOptions>{
    description: ''
  })
  userId?: ObjectId;
}
