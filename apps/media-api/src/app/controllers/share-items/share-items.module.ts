import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@api-modules/auth/auth.module';
import { JwtStrategy } from '@api-modules/auth/jwt.strategy';
import { ShareItemsController } from './share-items.controller';
import { ShareItemModule } from '@api-modules/share-item/share-item.module';
import { ShareItem } from '@api-modules/share-item/entities/share-item.entity';

@Module({
  imports: [ShareItemModule, TypeOrmModule.forFeature([ShareItem]), AuthModule],
  controllers: [ShareItemsController],
  providers: [JwtStrategy],
})
export class ShareItemsModule {}
