import { PartialType } from '@nestjs/mapped-types';
import { CreateProductListDto } from './create-product-list.dto';

export class UpdateProductListDto extends PartialType(CreateProductListDto) {}
