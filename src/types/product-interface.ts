import { ProductDetailsEntity } from '../product/entities/product-details.entity';
import { InsertResult, UpdateResult } from 'typeorm';
import { BasketEntity } from '../basket/entities/basket.entity';
import { ProductDescriptionEntity } from '../product/entities/product-description.entity';
import { ShopEntity } from '../shop/entities/shop.entity';

export interface ProductInterface {
  id?: string;
  name: string;
  price: number;
  isDiscounted?: boolean;
  quantity: number;
  wasEverBought?: boolean;
  boughtCounter?: number;
  createdAt?: Date;
  lastUpdateAt?: Date;
  details?: ProductDetailsEntity | null;
  description?: ProductDescriptionEntity | null;
  basket?: BasketEntity | null;
  basketId?: string;
  shopId?: ShopEntity | null;
}

export type GetListOfProductsResponse = ProductInterface[];
export type GetOneProductResponse = ProductInterface;

export interface GetPaginatedListOfProductResponse {
  entities: ProductInterface[];
  currentPage: number;
  pagesCount: number;
}

export interface ProductDetailInterface {
  id?: string;
  name: string;
}

export interface ProductDescriptionInterface {
  id?: string;
  description: string;
}

export type createProductResponse = InsertResult;
export type updateProductResponse = UpdateResult;
