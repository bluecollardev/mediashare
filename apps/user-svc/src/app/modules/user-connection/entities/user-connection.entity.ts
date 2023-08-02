import { AutoMap } from '@automapper/classes';
import { AutoMapOptions } from '@automapper/classes/lib/automap';
import { Entity, ObjectIdColumn } from 'typeorm';
import { ApiBaseEntity } from '@mediashare/core/entities/base.entity';
import { ObjectId } from 'mongodb';

@Entity('user_connection')
export class UserConnection extends ApiBaseEntity {
  @AutoMap({ typeFn: () => ObjectId } as AutoMapOptions)
  // Explicitly set the name option: https://github.com/typeorm/typeorm/issues/4026
  @ObjectIdColumn({ name: 'userId', nullable: false })
  userId: ObjectId;

  @AutoMap({ typeFn: () => ObjectId } as AutoMapOptions)
  // Explicitly set the name option: https://github.com/typeorm/typeorm/issues/4026
  @ObjectIdColumn({ name: 'connectionId', nullable: false })
  connectionId: ObjectId;
}
