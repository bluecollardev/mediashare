import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './tag.controller';
import { ShareItemModule } from '../../modules/share-item/share-item.module';
import { JwtStrategy } from '../../modules/auth/jwt.strategy';
import { AuthModule } from '../../modules/auth/auth.module';
import { ShareItem } from '../../modules/share-item/entities/share-item.entity';

@Module({
  imports: [ShareItemModule, TypeOrmModule.forFeature([ShareItem]), AuthModule],
  controllers: [TagController],
  providers: [JwtStrategy],
})
export class TagModule {}
