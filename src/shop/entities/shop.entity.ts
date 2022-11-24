import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Customer } from '../../user/entities/customer.entity';
import { User } from '../../user/entities/user.entity';
import { Basket } from '../../basket/entities/basket.entity';

@Entity()
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Product, (product: Product) => product.shop)
  @JoinTable()
  products: Product[];

  @ManyToMany(() => Customer, (customer: Customer) => customer.shopId)
  @JoinTable()
  customers: Customer[];

  @ManyToMany(() => User, (user: User) => user.shop)
  @JoinTable()
  users: User[];

  @ManyToMany(() => Basket, (basket: Basket) => basket.shopId)
  @JoinTable()
  baskets: Basket[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;
}
