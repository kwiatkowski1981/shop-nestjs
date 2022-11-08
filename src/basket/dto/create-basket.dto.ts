import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsEmpty,
  IsInt,
  IsUUID,
} from 'class-validator';
import { ProductInterface } from '../../types';

export class CreateBasketDto {
  @IsUUID()
  id?: string;

  @IsDateString()
  createAt?: Date;

  @IsDateString()
  lastUpdateAt?: Date;

  @IsDateString()
  canStayInBasket?: Date;

  @IsInt()
  itemRemoveCountdown?: number;

  @IsDecimal({ precision: 8, scale: 2, allowDecimal: true })
  basketBrutto?: number;

  @IsBoolean()
  isEmpty?: boolean;

  @IsEmpty()
  items: ProductInterface[];

  @IsInt()
  itemsCount?: number;
}
