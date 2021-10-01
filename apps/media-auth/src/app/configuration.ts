import { registerAs } from '@nestjs/config';
import { AuthUser } from './auth/auth-user.entity';

export default registerAs('auth', () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRESS_PORT || 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [AuthUser],
  msPort: process.env.MS_PORT,
  msHost: process.env.MS_HOST,
  msApiPort: process.env.MS_API_PORT,
}));
