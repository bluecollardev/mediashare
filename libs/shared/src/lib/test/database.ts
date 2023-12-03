import { DataSource } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

export async function createDB(entities) {
  return new DataSource({
    synchronize: false,
    autoLoadEntities: false,
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'mediashare-test',
    entities,
    ssl: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    logging: true,
  } as MongoConnectionOptions);
}
