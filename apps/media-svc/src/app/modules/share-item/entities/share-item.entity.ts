import { AutoMap } from '@automapper/classes';
import { AutoMapOptions } from '@automapper/classes/lib/automap';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';
import { ApiDecoratorOptions, ApiObjectId } from '@mediashare/shared';
import { IsBoolean } from 'class-validator';
import { ObjectId } from 'mongodb';
import { ApiBaseEntity } from '@mediashare/core/entities/base.entity';

@Entity('share_item')
export class ShareItem extends ApiBaseEntity {
  @ApiObjectId(<ApiDecoratorOptions>{ readOnly: true })
  @AutoMap({ typeFn: () => ObjectId } as AutoMapOptions)
  @ObjectIdColumn({ name: 'userId', nullable: false, unique: false })
  @Index('userId', { unique: false })
  userId: ObjectId;

  @ApiObjectId(<ApiDecoratorOptions>{ required: false })
  @AutoMap({ typeFn: () => ObjectId } as AutoMapOptions)
  @ObjectIdColumn({ name: 'playlistId', nullable: true, unique: false })
  @Index('playlistId', { unique: false })
  playlistId: ObjectId;

  @ApiObjectId(<ApiDecoratorOptions>{ required: false })
  @AutoMap({ typeFn: () => ObjectId } as AutoMapOptions)
  @ObjectIdColumn({ name: 'mediaId', nullable: true, unique: false })
  @Index('mediaId', { unique: false })
  mediaId: ObjectId;

  @IsBoolean()
  @AutoMap()
  @Column({ name: 'read' })
  read: boolean;
}
