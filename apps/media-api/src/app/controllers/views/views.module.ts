import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewItem } from './entities/view-item.entity';
import { AuthModule } from '../../modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ViewItem]), AuthModule],
  controllers: [ViewsController],
  providers: [ViewsService]
})
export class ViewsModule {}
