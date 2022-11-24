import { ProductDetail } from '../product/entities/product-details.entity';
import { InsertResult, UpdateResult } from 'typeorm';
import { Basket } from '../basket/entities/basket.entity';
import { ProductDescription } from '../product/entities/product-description.entity';
import { Shop } from '../shop/entities/shop.entity';
import { ProductList } from '../product-list/entities/product-list.entity';

export interface ProductInterface {
  id?: string;
  name: string;
  price: number;
  createdAt?: Date;
  lastUpdateAt?: Date;
  details?: ProductDetail | null;
  description?: ProductDescription | null;
  baskets?: Basket[] | null;
  shop?: Shop | null;
  productList?: ProductList | null;
}

export type GetListOfProductsResponse = ProductInterface[];
export type GetOneProductResponse = ProductInterface;

export type createProductResponse = InsertResult;
export type updateProductResponse = UpdateResult;

export interface GetPaginatedListOfProductResponse {
  entities: ProductInterface[];
  currentPage: number;
  pagesCount: number;
}
