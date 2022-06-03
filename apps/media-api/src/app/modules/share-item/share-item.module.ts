import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@api-modules/auth/auth.module';
import { JwtStrategy } from '@api-modules/auth/jwt.strategy';
import { ShareItemController } from './share-item.controller';
import { ShareItemService } from './share-item.service';
import { ShareItem } from './entities/share-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShareItem]), AuthModule],
  controllers: [ShareItemController],
  providers: [JwtStrategy, ShareItemService],
})
export class ShareItemModule {}
