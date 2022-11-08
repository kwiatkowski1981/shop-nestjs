import { InsertResult } from 'typeorm';
import { ProductInterface } from './product-interface';

export interface BasketInterface {
  id?: string;
  createAt?: Date;
  lastUpdateAt?: Date;
  canStayInBasket?: Date;
  itemRemoveCountdown?: number;
  basketBrutto?: number;
  isEmpty?: boolean;
  products: ProductInterface[];
  productsCount?: number;
}

export type createBasketResponse = InsertResult;
export type updateBasketResponse = BasketInterface;
export type getBasketResponse = BasketInterface;
export type getAllBasketResponse = BasketInterface[];

export type AddProductToBasketResponse =
  | {
      isSuccess: true;
      index: number;
    }
  | {
      isSuccess: false;
    };

export interface RemoveProductFromBasketResponse {
  isSuccess: boolean;
}

// export type ListProductsInBasketResponse = AddProductDto[];

// export type GetTotalPriceResponse =
//   | number
//   | {
//       isSuccess: false;
//       alternativeBasket: AddProductDto[];
//     };
