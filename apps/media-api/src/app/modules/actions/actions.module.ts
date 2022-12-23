import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from '@api-modules/auth/auth.module';
import { AppConfigModule } from '@api-modules/app-config/app-config.module';
import { AppConfigService } from '@api-modules/app-config/app-config.provider';
import { ActionsController } from './actions.controller';

@Module({
  imports: [
    AuthModule,
    AppConfigModule,
  ],
  controllers: [ActionsController],
  providers: [AppConfigService],
  exports: [],
})
export class ActionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(JwtDecodeMiddleware).forRoutes(ActionsController);
  }
}
