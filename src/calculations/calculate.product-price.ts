import { ProductInterface } from '../types';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CalculateProductPrice {
  private readonly logger = new Logger(CalculateProductPrice.name);

  public calculateTotalBruttoPrice(products: ProductInterface[]): number {
    const superFinalPrice = products
      .map((product) => product.price)
      .reduce(
        (previousValue, currentValue) =>
          Number(previousValue) + Number(currentValue),
        0.0,
      )
      .toFixed(2);
    this.logger.error(superFinalPrice);
    return Number(superFinalPrice);

  }
}
