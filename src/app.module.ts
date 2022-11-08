import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { BasketModule } from './basket/basket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source.dev';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ProductModule,
    BasketModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// todo  https://github.com/Ami777/NestJS-Samuraj
