import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { Product } from '../../product/entities/product.entity';

export class CreateProductListDto {
  @IsUUID()
  id?: string;

  product?: Product;

  @IsBoolean()
  isDiscounted?: boolean;

  @IsNumber()
  quantity?: number;

  @IsBoolean()
  wasEverBought?: boolean;

  @IsInt()
  boughtCounter?: number;

  @IsDateString()
  createdAt?: Date;

  @IsDateString()
  lastUpdateAt?: Date;
}
