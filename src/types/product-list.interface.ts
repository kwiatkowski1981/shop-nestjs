import { Product } from '../product/entities/product.entity';

export interface ProductListInterface {
  id?: string;
  listName?: string;
  isDiscounted?: boolean;
  quantity: number;
  wasEverBought?: boolean;
  boughtCounter?: number;
  createdAt?: Date;
  lastUpdateAt?: Date;
  products?: Product[] | null;
}
