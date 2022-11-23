import { ProductDetailsEntity } from '../entities/product-details.entity';
import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { ProductDescriptionEntity } from '../entities/product-description.entity';

export class CreateProductDto {
  @IsUUID()
  id: string;

  @IsString()
  @Length(5, 55, { message: 'The name length is wrong' })
  name: string;

  @IsDecimal({
    precision: 8,
    scale: 2,
    allowDecimal: true,
  })
  price: number;

  @IsNumber()
  quantity: number;

  @IsBoolean()
  isDiscounted?: boolean;

  @IsInt()
  boughtCounter?: number;

  @IsBoolean()
  wasEverBought?: boolean;

  @IsDateString()
  createdAt?: Date;

  @IsDateString()
  lastUpdateAt?: Date;

  details?: ProductDetailsEntity | null;

  description?: ProductDescriptionEntity | null;
}
