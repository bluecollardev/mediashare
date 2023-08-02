import { AutoMap } from '@automapper/classes';
import { ApiDecoratorOptions, ApiString } from '@mediashare/shared';
import { ApiProperty,  } from '@nestjs/swagger';

export interface IApiBaseDto {
  _id: string;
}

export class ApiBaseDto implements IApiBaseDto {
  @AutoMap()
  @ApiString(<ApiDecoratorOptions>{ required: true })
  _id: string;

  // @AutoMap()
  // @ApiString(<ApiDecoratorOptions>{ required: false })
  // createdBy?: string;

  @AutoMap()
  @ApiProperty({ readOnly: true, type: Date, required: false })
  readonly createdAt?: Date;

  @AutoMap()
  @ApiProperty({ readOnly: true, type: Date, required: false })
  readonly updatedDate?: Date;
}
