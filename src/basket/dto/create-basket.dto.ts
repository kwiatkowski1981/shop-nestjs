import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsInt,
  IsUUID,
} from 'class-validator';

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

  // @IsEmpty()
  // items: ShopItemInterface[];

  @IsInt()
  itemsCount?: number;
}
