import { AutoMap } from '@automapper/classes';
import { ApiBaseDto } from '@mediashare/core/dtos/base.dto';
import { ApiDecoratorOptions, ApiString } from '@mediashare/shared';
import { IsDefined } from 'class-validator';

export class UserConnectionDto extends ApiBaseDto {
  @IsDefined()
  @AutoMap()
  @ApiString(<ApiDecoratorOptions>{ required: true })
  userId: string;

  @IsDefined()
  @AutoMap()
  @ApiString(<ApiDecoratorOptions>{ required: true })
  connectionId: string;
}
