import { Module } from '@nestjs/common';
import { ShareItemsController } from './share-items.controller';
import { ShareItemModule } from '../../modules/share-item/share-item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareItem } from './entities/share-item.entity';
import { JwtStrategy } from '../../core/providers/jwt.strategy';

@Module({
  imports: [ShareItemModule, TypeOrmModule.forFeature([ShareItem])],
  controllers: [ShareItemsController],
  providers: [JwtStrategy],
})
export class ShareItemsModule {}
