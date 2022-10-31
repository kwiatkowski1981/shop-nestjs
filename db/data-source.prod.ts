import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptionsProd: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_PROD_HOST,
  port: process.env.DB_PROD_PORT ? parseInt(process.env.DB_PROD_PORT, 10) : 3456,
  username: process.env.DB_PROD_USERNAME,
  password: process.env.DB_PROD_PASSWORD,
  database: process.env.DB_PROD_NAME,
  entities: ['dist/**/*.entity.js'],
  migrationsRun: true,
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migrations_typeorm',
  // logging: true,
  // entities: [ShopItemEntity],
};

export const dataSourceProd = new DataSource(dataSourceOptionsProd);
