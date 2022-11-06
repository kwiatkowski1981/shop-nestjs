import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { BasketInterface } from '../types';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/')
  @HttpCode(201)
  createNewBasket() {
    return this.basketService.createNewBasketQuery();
  }

  @Post('/putBasketItemIntoTheBasket')
  addShopItemToTheBasket(@Body() basketItem: BasketInterface) {
    return this.basketService.addShopItemToTheBasketQuery(basketItem);
  }

  @Get('/')
  findAll() {
    return this.basketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(+id, updateBasketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basketService.remove(+id);
  }
}
