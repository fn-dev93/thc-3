import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import type { DataSourceOptions } from 'typeorm';

const env = ['.env', `.${process.env.NODE_ENV || 'dev'}.env`];
dotenv.config({ path: env });

const entitiesPath = join(__dirname, '/../**/*.entity{.ts,.js}');
const migrationsPath = join(__dirname, '/../../db/migrations/*{.ts,.js}');

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'test',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_NAME || 'test',
  entities: [entitiesPath],
  migrations: [migrationsPath],
  synchronize: true,
};

export const AppDS = new DataSource(DataSourceConfig);
