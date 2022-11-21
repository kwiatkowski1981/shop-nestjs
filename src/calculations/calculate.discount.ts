import { CustomerEntity } from '../user/entities/customer.entity';

export class CalculateDiscount {
  private discountForStandard = 0.05;
  private discountForRegular = 0.1;
  private discountForVip = 0.15;

  private applyDiscount(price: number, discount: number) {
    return price * (1 - discount);
  }

  private calculateStandardDiscount(price: number) {
    if (price > 1000) {
      return this.applyDiscount(price, this.discountForRegular);
    } else {
      return price;
    }
  }

  private calculatePremiumDiscount(price: number) {
    if (price > 1000) {
      return this.applyDiscount(price, this.discountForVip);
    } else {
      return this.applyDiscount(price, this.discountForStandard);
    }
  }

  public calculateDiscountPrice(
    customer: CustomerEntity,
    price: number,
  ): number {
    if (customer.isVip) {
      return this.calculatePremiumDiscount(price);
    } else {
      return this.calculateStandardDiscount(price);
    }
  }
}
