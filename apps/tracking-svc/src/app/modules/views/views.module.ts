import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import { ViewItem } from './entities/view-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ViewItem])],
  controllers: [ViewsController],
  providers: [ViewsService],
})
export class ViewsModule {}
