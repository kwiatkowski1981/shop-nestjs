import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateProductListDto {
  @IsUUID()
  id: string;

  @IsString()
  listName: string;

  @IsBoolean()
  isDiscounted?: boolean;

  @IsNumber()
  quantity: number;

  @IsBoolean()
  wasEverBought?: boolean;

  @IsInt()
  boughtCounter?: number;

  @IsDateString()
  createdAt?: Date;

  @IsDateString()
  lastUpdateAt?: Date;

  products?: Product[];
}
