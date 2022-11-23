import { Logger } from '@nestjs/common';

export class CalculateProductTax {
  private readonly logger = new Logger(CalculateProductTax.name);
  private VAT = 0.24;
  public calculateProductBruttoPrice(price: number): string {
    this.logger.debug(`VAT Tax = ${Number(price * this.VAT).toFixed(2)}`);
    const taxedPrice = price + price * this.VAT;
    return Number(taxedPrice).toFixed(2);
  }
}
