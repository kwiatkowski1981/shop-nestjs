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
  getAllBasketResponse,
  getBasketResponse,
  ProductInterface,
  updateBasketResponse,
} from '../types';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/')
  @HttpCode(201)
  createNewBasket() {
    return this.basketService.createNewBasketQuery();
  }

  @Patch('/putProductIntoTheBasket/:basketId')
  @HttpCode(204)
  addShopItemToTheBasket(
    @Param('basketId') basketId: string,
    @Body() productId: string,
  ) {
    return this.basketService.addProductToTheBasketByUpdatingItQuery(
      basketId,
      productId,
    );
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
    @Body() itemToAdd: ProductInterface,
  ): Promise<updateBasketResponse> {
    const basket = await this.basketService.findBasketByIdQuery(id);
    if (!basket) {
      throw new NotFoundException('Product not found');
    }
    return this.basketService.updateBasketQuery(basket, itemToAdd);
  }

  @Delete(':id')
  @HttpCode(204)
  removeBasket(@Param('id') id: string) {
    return this.basketService.removeBasketQuery(id);
  }
}
