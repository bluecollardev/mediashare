import { registerAs } from '@nestjs/config';
import { AuthUser } from './auth/auth-user.entity';

export default registerAs('db', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [AuthUser],
}));
