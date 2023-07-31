import { Module } from '@nestjs/common';
import { WellKnownController } from './well-known.controller';

@Module({
  controllers: [WellKnownController],
})
export class WellKnownModule {}
