import { AutoMap } from '@automapper/classes';
import { ApiDecoratorOptions, ApiString } from '@mediashare/shared';
import { IsDefined } from 'class-validator';

export class CreateUserConnectionDto {
  @IsDefined()
  @AutoMap()
  @ApiString(<ApiDecoratorOptions>{ required: true })
  userId: string;

  @IsDefined()
  @AutoMap()
  @ApiString(<ApiDecoratorOptions>{ required: true })
  connectionId: string;
}
