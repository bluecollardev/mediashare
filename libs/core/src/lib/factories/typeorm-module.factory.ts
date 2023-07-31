import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeOrmModuleFactory = () => TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    // db.type return type messes up things and its not exported
    type: configService.get<string>('db.type') as any,
    host: configService.get<string>('db.host'),
    port: configService.get<number>('db.port'),
    database: configService.get<string>('db.database'),
    username: configService.get<string>('db.username'),
    password: configService.get<string>('db.password'),
    entities: configService.get<[]>('db.entities'),
    ssl: configService.get<boolean>('db.ssl'),
    autoLoadEntities: configService.get<boolean>('db.autoLoadEntities'),
    synchronize: configService.get<boolean>('db.synchronize'),
    useUnifiedTopology: configService.get<boolean>('db.useUnifiedTopology'),
    useNewUrlParser: configService.get<boolean>('db.useNewUrlParser'),
    logging: configService.get<boolean>('db.logging'),
    dropSchema: configService.get<boolean>('db.dropSchema'),
  }),
  inject: [ConfigService],
});
