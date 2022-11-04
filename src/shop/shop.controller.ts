import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import {
  GetListOfShopItemsResponse,
  GetOneShopItemResponse,
  ShopItemDetailInterface,
  ShopItemInterface,
} from '../types';
import { InsertResult, UpdateResult } from 'typeorm';
import { ShopItemEntity } from './entities/shop-item.entity';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Post('/')
  @HttpCode(201)
  createNewShopItem(
    @Body() shopItemToCreate: ShopItemInterface,
  ): Promise<InsertResult> {
    return this.shopService.createNewShopItemQuery(shopItemToCreate);
  }

  @Post('/addDetailToShopItem/:shopItemId')
  @HttpCode(201)
  createNewDetailAndSetNewUpdateDateToGivenShopItem(
    @Param('shopItemId') shopItemId: string,
    @Body() addDetail: ShopItemDetailInterface,
  ): Promise<void> {
    return this.shopService.createNewShopItemDetailAndSetLastUpdateAtValueToNewDateQuery(
      shopItemId,
      addDetail,
    );
  }

  @Get('/')
  @HttpCode(200)
  findAllShopItems(): Promise<GetListOfShopItemsResponse> {
    return this.shopService.findAllShopItems();
  }

  @Get(':id')
  @HttpCode(200)
  findOneShopItem(@Param('id') id: string): Promise<GetOneShopItemResponse> {
    return this.shopService.findOneShopItemById(id);
  }

  @Get('/findBySearchTerm/:searchTerm')
  @HttpCode(200)
  findOneShopItemBySearchTerm(
    @Param('searchTerm') searchTerm: string,
  ): Promise<GetListOfShopItemsResponse> {
    return this.shopService.findShopItemsBySearchTermQuery(searchTerm);
  }

  @Patch(':id')
  @HttpCode(204)
  updateShopItem(
    @Param('id') id: string,
    @Body() shopItemToUpdate: ShopItemInterface,
  ): Promise<UpdateResult> {
    return this.shopService.updateOneShopItemById(id, shopItemToUpdate);
  }

  @Delete(':id')
  @HttpCode(204)
  removeShopItem(@Param('id') id: string, entity: any) {
    return this.shopService.removeOneShopItemById(
      id,
      (entity = ShopItemEntity),
    );
  }

  @Delete('/removeDetailFromShopItem/:id')
  @HttpCode(204)
  removeShopItemDetail(@Param('id') id: string) {
    return this.shopService.removeShopItemDetailQuery(id);
  }
}
