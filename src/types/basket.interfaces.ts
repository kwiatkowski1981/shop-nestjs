// import { AddProductDto } from '../basket/dto/add-product.dto';

import { InsertResult, UpdateResult } from 'typeorm';

export interface BasketInterface {
  id?: string;
  createAt?: Date;
  lastUpdateAt?: Date;
  canStayInBasket?: Date;
  itemRemoveCountdown?: number;
  basketBrutto?: number;
  isEmpty?: boolean;
  // items: ShopItemInterface[];
  itemsCount?: number;
}

export type createBasketResponse = InsertResult;
export type updateBasketResponse = UpdateResult;

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
