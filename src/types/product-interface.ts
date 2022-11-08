import { ProductDetailsEntity } from '../product/entities/product-details.entity';
import { InsertResult, UpdateResult } from 'typeorm';
import { BasketEntity } from '../basket/entities/basket.entity';

export interface ProductInterface {
  id?: string;
  name: string;
  description: string;
  price: number;
  createdAt?: Date;
  lastUpdateAt?: Date;
  boughtCounter?: number;
  wasEverBought?: boolean;
  details?: ProductDetailsEntity | null;
  basket?: BasketEntity;
  basketId?: string;
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

export type createProductResponse = InsertResult;
export type updateProductResponse = UpdateResult;
