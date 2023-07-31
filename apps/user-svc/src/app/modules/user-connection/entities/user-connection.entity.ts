import { AutoMap } from '@automapper/classes';
import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ApiBaseEntity } from '@mediashare/core/entities/base.entity';
import { ObjectId } from 'mongodb';

@Entity('user_connection')
export class UserConnection extends ApiBaseEntity {
  @AutoMap()
  @ApiProperty()
  @Column({ nullable: false })
  userId: ObjectId;

  @AutoMap()
  @ApiProperty()
  @Column({ nullable: false })
  connectionId: ObjectId;
}
