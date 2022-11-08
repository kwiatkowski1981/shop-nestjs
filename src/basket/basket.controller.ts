import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import {
  BasketInterface,
  getAllBasketResponse,
  getBasketResponse,
  updateBasketResponse,
} from '../types';
import { InsertResult } from 'typeorm';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/')
  @HttpCode(201)
  createNewBasket() {
    return this.basketService.createNewBasketQuery();
  }

  @Post('/putBasketItemIntoTheBasket')
  @HttpCode(201)
  addShopItemToTheBasket(
    @Body() basketItem: BasketInterface,
  ): Promise<InsertResult> {
    return this.basketService.addShopItemToTheBasketQuery(basketItem);
  }

  @Get('/')
  @HttpCode(200)
  findAll(): Promise<getAllBasketResponse> {
    return this.basketService.findAllBasketsQuery();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string): Promise<getBasketResponse> {
    return this.basketService.findBasketByIdQuery(id);
  }

  @Patch(':id')
  @HttpCode(202)
  public async updateBasket(
    @Param('id') id: string,
    @Body() itemToUpdate: BasketInterface,
  ): Promise<updateBasketResponse> {
    const basket = await this.basketService.findBasketByIdQuery(id);
    if (!basket) {
      throw new NotFoundException('Product not found');
    }
    return this.basketService.updateBasketQuery(basket, itemToUpdate);
  }

  @Delete(':id')
  @HttpCode(204)
  removeBasket(@Param('id') id: string) {
    return this.basketService.removeBasketQuery(id);
  }
}
