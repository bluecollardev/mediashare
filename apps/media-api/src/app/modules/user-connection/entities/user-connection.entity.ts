import { BcEntity } from '@api-core/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity('user_connection')
export class UserConnection extends BcEntity {
  @ApiProperty()
  @Column('userId')
  userId: string;

  @ApiProperty()
  @Column('connectionId')
  connectionId: string;
}
