import { ShopItemDetailsEntity } from '../shop/entities/shop-item-details.entity';
import { InsertResult, UpdateResult } from 'typeorm';

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

export type GetOneShopItemDetailResponse = ShopItemDetailInterface;
export type CreateShopItemDetailResponse = ShopItemDetailInterface;
