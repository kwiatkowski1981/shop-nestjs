import { ProductDetailsEntity } from '../entities/product-details.entity';
import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsInt,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { BasketEntity } from '../../basket/entities/basket.entity';

export class CreateProductDto {
  @IsUUID()
  id?: string;

  @IsString()
  @Length(5, 55, { message: 'The name length is wrong' })
  name: string;

  @IsDecimal({
    precision: 8,
    scale: 2,
    allowDecimal: true,
  })
  price: number;

  @IsDateString()
  createdAt?: Date;

  @IsDateString()
  lastUpdateAt?: Date;

  @IsInt()
  boughtCounter?: number;

  @IsBoolean()
  wasEverBought?: boolean;

  details?: ProductDetailsEntity | null;

  basket?: BasketEntity;

  basketId?: string;
}
