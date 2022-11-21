import { Module } from '@nestjs/common';
import { CalculateProductPrice } from './calculate.product-price';
import { CalculateProductTax } from './calculate.vat';

@Module({
  providers: [CalculateProductPrice, CalculateProductTax],
  exports: [CalculateProductPrice, CalculateProductTax],
})
export class CalculationsModule {}
