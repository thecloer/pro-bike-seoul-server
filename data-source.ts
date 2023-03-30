import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

// https://typeorm-extension.tada5hi.net/guide/seeding.html#configuration
export default new DataSource({
  type: 'postgres',
  host: configService.get('PGIS_HOST'),
  port: configService.get<number>('PGIS_PORT'),
  username: configService.get('PGIS_USERNAME'),
  password: configService.get('PGIS_PASSWORD'),
  database: configService.get('PGIS_NAME'),
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  dropSchema: true, //reset
  synchronize: true,
  // migrations: ['src/database/migrations/*.ts'],
  // migrationsTableName: 'migrations',
});
