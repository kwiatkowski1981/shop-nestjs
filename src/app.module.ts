import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { BasketModule } from './basket/basket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptionsDev } from '../db/data-source.dev';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptionsDev),
    UserModule,
    ShopModule,
    BasketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// todo  https://github.com/Ami777/NestJS-Samuraj
