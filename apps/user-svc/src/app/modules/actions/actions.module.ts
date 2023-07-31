import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ActionsController } from './actions.controller';

@Module({
  imports: [],
  controllers: [ActionsController],
  providers: [],
  exports: [],
})
export class ActionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(JwtDecodeMiddleware).forRoutes(ActionsController);
  }
}
