import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptionsDev: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_DEV_HOST,
  port: process.env.DB_DEV_PORT ? parseInt(process.env.DB_DEV_PORT, 10) : 3456,
  username: process.env.DB_DEV_USERNAME,
  password: process.env.DB_DEV_PASSWORD,
  database: process.env.DB_DEV_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  // entities: [ShopItemEntity, ShopItemDetailsEntity, ShopSetEntity],
  synchronize: true,
  logging: false,
};

export const dataSourceDev = new DataSource(dataSourceOptionsDev);
