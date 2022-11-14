import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDetailsDto } from './create-product-details.dto';

export class UpdateProductDetailsDto extends PartialType(
  CreateProductDetailsDto,
) {}
