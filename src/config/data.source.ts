import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import type { DataSourceOptions } from 'typeorm';

const env = `.${process.env.NODE_ENV || 'dev'}.env`;
dotenv.config({ path: env });

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'test',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_NAME || 'test',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export const AppDS = new DataSource(DataSourceConfig);
