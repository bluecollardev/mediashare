import { Module } from '@nestjs/common';
import { ShareItemsController } from './share-items.controller';
import { ShareItemModule } from '../../modules/share-item/share-item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareItem } from './entities/share-item.entity';
import { JwtStrategy } from '../../modules/auth/jwt.strategy';
import { AuthModule } from '../../modules/auth/auth.module';

@Module({
  imports: [ShareItemModule, TypeOrmModule.forFeature([ShareItem]), AuthModule],
  controllers: [ShareItemsController],
  providers: [JwtStrategy],
})
export class ShareItemsModule {}
