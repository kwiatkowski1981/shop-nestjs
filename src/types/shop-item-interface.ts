import { ShopItemDetailsEntity } from '../shop/entities/shop-item-details.entity';
import { InsertResult, UpdateResult } from 'typeorm';
import { BasketEntity } from '../basket/entities/basket.entity';

export interface ShopItemInterface {
  id?: string;
  name: string;
  description: string;
  price: number;
  createdAt?: Date;
  lastUpdateAt?: Date;
  boughtCounter?: number;
  wasEverBought?: boolean;
  details?: ShopItemDetailsEntity | null;
  basket?: BasketEntity;
  basketId?: string;
}

export type GetListOfShopItemsResponse = ShopItemInterface[];
export type GetOneShopItemResponse = ShopItemInterface;

export interface GetPaginatedListOfProductResponse {
  entities: ShopItemInterface[];
  currentPage: number;
  pagesCount: number;
}

export interface ShopItemDetailInterface {
  id?: string;
  name: string;
}

export type createShopItemResponse = InsertResult;
export type updateShopItemResponse = UpdateResult;
